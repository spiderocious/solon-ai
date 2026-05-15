import type { Request, Router as RouterType } from 'express';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { AppError, NotFoundError } from '@lib/errors.js';
import { ResponseUtil } from '@lib/response.js';
import { ids } from '@lib/ids.js';
import { signAdminToken } from '@lib/auth/jwt.js';
import { adminAuth } from '@middlewares/adminAuth.middleware.js';

import { AdminModel } from './admin.model.js';
import { MockDataModel } from '../mock-data/mock-data.model.js';
import { SessionModel } from '../sessions/session.model.js';
import { LeadModel } from '../leads/lead.model.js';
import { FeedbackModel } from '../feedback/feedback.model.js';

const router: RouterType = Router();

const EDITABLE_KEYS = [
  'simulator.baseline',
  'agents.readiness',
  'finance.dashboard',
  'warroom.tally',
];

const SetupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const UpdateMockDataSchema = z.object({
  data: z.record(z.unknown()),
});

// POST /api/v1/admin/setup — first-run only
router.post(
  '/setup',
  asyncHandler(async (req, res) => {
    const count = await AdminModel.countDocuments();
    if (count > 0) {
      throw new AppError('admin_setup_disabled', 'Admin setup is disabled', 403);
    }

    const body = SetupSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(body.password, 12);

    const admin = await AdminModel.create({
      adminId: ids.admin(),
      email: body.email,
      passwordHash,
    });

    const token = signAdminToken({ sub: admin.adminId, email: admin.email });
    ResponseUtil.created(res, { token, adminId: admin.adminId });
  }),
);

// POST /api/v1/admin/login
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const body = LoginSchema.parse(req.body);
    const admin = await AdminModel.findOne({ email: body.email.toLowerCase() }).lean();

    if (!admin) {
      throw new AppError('invalid_credentials', 'Invalid credentials', 401);
    }

    const valid = await bcrypt.compare(body.password, admin.passwordHash);
    if (!valid) {
      throw new AppError('invalid_credentials', 'Invalid credentials', 401);
    }

    const token = signAdminToken({ sub: admin.adminId, email: admin.email });
    ResponseUtil.ok(res, { token, adminId: admin.adminId });
  }),
);

// GET /api/v1/admin/stats — visit, lead, feedback counts
router.get(
  '/stats',
  adminAuth,
  asyncHandler(async (_req, res) => {
    const [sessions, leads, feedback] = await Promise.all([
      SessionModel.countDocuments(),
      LeadModel.countDocuments({ skipped: false }),
      FeedbackModel.countDocuments(),
    ]);

    const recentLeads = await LeadModel.find({ skipped: false })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean()
      .then((docs) =>
        docs.map((d) => ({
          name: d.name,
          email: d.email,
          phone: d.phone,
          role: d.role,
          party: d.party,
          state: d.state,
          createdAt: d.createdAt,
        })),
      );

    ResponseUtil.ok(res, {
      counts: { sessions, leads, feedback },
      recentLeads,
    });
  }),
);

// GET /api/v1/admin/mock-data — list all editable keys
router.get(
  '/mock-data',
  adminAuth,
  asyncHandler(async (_req, res) => {
    const docs = await MockDataModel.find({ editable: true }).lean();
    ResponseUtil.ok(
      res,
      docs.map((d) => ({
        key: d.key,
        label: d.label,
        data: d.data,
        updatedAt: d.updatedAt,
      })),
    );
  }),
);

// PATCH /api/v1/admin/mock-data/:key — update editable key
router.patch(
  '/mock-data/:key',
  adminAuth,
  asyncHandler(async (req, res) => {
    const key = String(req.params.key);
    if (!EDITABLE_KEYS.includes(key)) {
      throw new AppError('mock_key_not_editable', `Key '${key}' is not editable`, 403);
    }

    const { data } = UpdateMockDataSchema.parse(req.body);

    // Build dot-notation $set paths so unspecified fields are preserved (deep merge)
    const dataFields = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [`data.${k}`, v]),
    );

    const doc = await MockDataModel.findOneAndUpdate(
      { key },
      {
        $set: {
          ...dataFields,
          updatedBy: (req as Request & { admin?: { email: string } }).admin?.email,
        },
      },
      { new: true },
    ).lean();

    if (!doc) throw new NotFoundError(`Mock data key '${key}'`);
    ResponseUtil.ok(res, { key: doc.key, data: doc.data, updatedAt: doc.updatedAt });
  }),
);

// GET /api/v1/admin/sessions — recent sessions with page trails
router.get(
  '/sessions',
  adminAuth,
  asyncHandler(async (req, res) => {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const sessions = await SessionModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    ResponseUtil.ok(res, sessions.map((s) => ({
      sessionId: s.sessionId,
      leadId: s.leadId,
      pageTrail: s.pageTrail,
      createdAt: s.createdAt,
    })));
  }),
);

// GET /api/v1/admin/feedback — all feedback
router.get(
  '/feedback',
  adminAuth,
  asyncHandler(async (_req, res) => {
    const items = await FeedbackModel.find().sort({ createdAt: -1 }).lean();
    ResponseUtil.ok(res, items.map((f) => ({
      feedbackId: f.feedbackId,
      sessionId: f.sessionId,
      rating: f.rating,
      comment: f.comment,
      page: f.page,
      createdAt: f.createdAt,
    })));
  }),
);

export default router;
