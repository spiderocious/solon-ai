// Theme
export * from './theme/index.js';

// Utils
export { cn } from './utils/cn.js';

// Primitives
export { Button } from './primitives/button/index.js';
export type { ButtonVariant, ButtonSize, ButtonProps } from './primitives/button/index.js';
export { AppButton } from './primitives/app-button/index.js';
export type { AppButtonVariant, AppButtonProps } from './primitives/app-button/index.js';
export { AppText } from './primitives/app-text/index.js';
export type { AppTextVariant, AppTextProps } from './primitives/app-text/index.js';

export { TextInput } from './primitives/text-input/index.js';
export type { TextInputProps } from './primitives/text-input/index.js';
export { FieldLabel } from './primitives/field-label/index.js';
export type { FieldLabelProps } from './primitives/field-label/index.js';
export { Select } from './primitives/select/index.js';
export type { SelectProps } from './primitives/select/index.js';
export { Scrubber } from './primitives/scrubber/index.js';
export type { ScrubberProps } from './primitives/scrubber/index.js';
export { SearchBar } from './primitives/search-bar/index.js';
export type { SearchBarProps } from './primitives/search-bar/index.js';
export { Checkbox } from './primitives/checkbox/index.js';
export type { CheckboxProps } from './primitives/checkbox/index.js';
export { Radio, RadioCard } from './primitives/radio/index.js';
export type { RadioProps, RadioCardProps } from './primitives/radio/index.js';
export { SegmentControl } from './primitives/segment-control/index.js';
export type { SegmentControlProps, SegmentOption } from './primitives/segment-control/index.js';
export { Toggle } from './primitives/toggle/index.js';
export type { ToggleProps } from './primitives/toggle/index.js';
export { DateRangePicker } from './primitives/date-range-picker/index.js';
export type { DateRangePickerProps, DateRange } from './primitives/date-range-picker/index.js';
export { Countdown } from './primitives/countdown/index.js';
export type { CountdownProps } from './primitives/countdown/index.js';
export { CampaignTimeline } from './primitives/campaign-timeline/index.js';
export type { CampaignTimelineProps, TimelineEvent } from './primitives/campaign-timeline/index.js';
export { NairaInput } from './primitives/naira-input/index.js';
export type { NairaInputProps } from './primitives/naira-input/index.js';
export { PUCodeInput } from './primitives/pu-code-input/index.js';
export type { PUCodeInputProps } from './primitives/pu-code-input/index.js';
export { IssueTagPicker } from './primitives/issue-tag-picker/index.js';
export type { IssueTagPickerProps } from './primitives/issue-tag-picker/index.js';
export { SeveritySlider } from './primitives/severity-slider/index.js';
export type { SeveritySliderProps } from './primitives/severity-slider/index.js';
export { OTPInput } from './primitives/otp-input/index.js';
export type { OTPInputProps } from './primitives/otp-input/index.js';
export { CopilotPrompt } from './primitives/copilot-prompt/index.js';
export type { CopilotPromptProps } from './primitives/copilot-prompt/index.js';

// Display components
export { TierChip } from './display/tier-chip/index.js';
export type { TierChipProps, TierVariant } from './display/tier-chip/index.js';
export { ConfidenceBar } from './display/confidence-bar/index.js';
export type { ConfidenceBarProps, ConfidenceLevel } from './display/confidence-bar/index.js';
export { Avatar } from './display/avatar/index.js';
export type { AvatarProps, AvatarSize, AvatarVariant } from './display/avatar/index.js';
export { StatusPill } from './display/status-pill/index.js';
export type { StatusPillProps, StatusPillVariant } from './display/status-pill/index.js';
export { OfficialStamp } from './display/official-stamp/index.js';
export type { OfficialStampProps, StampVariant } from './display/official-stamp/index.js';
export { Skeleton, SkeletonCard } from './display/skeleton/index.js';
export type { SkeletonProps, SkeletonCardProps } from './display/skeleton/index.js';
export { LivePulse } from './display/live-pulse/index.js';
export type { LivePulseProps } from './display/live-pulse/index.js';

// Services
export { DrawerService, DrawerStore, ModalHost, ToastHost } from './services/drawer/index.js';
export type { DrawerState, ToastItem, ModalItem, ToastVariant, ModalVariant } from './services/drawer/index.js';

// Icons are NOT re-exported here. Import them via the dedicated proxy:
//   import { IconHome } from '@icons';
// This keeps the icon source swappable in one file.
