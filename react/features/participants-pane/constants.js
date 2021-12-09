// @flow

import { isUndefined } from 'lodash';
import React from 'react';

import {
    Icon,
    IconCameraEmpty,
    IconCameraEmptyDisabled,
    IconMicrophoneEmpty,
    IconMicrophoneEmptySlash
} from '../base/icons';

/**
 * Reducer key for the feature.
 */
export const REDUCER_KEY = 'features/participants-pane';

export type ActionTrigger = 'Hover' | 'Permanent'

/**
 * Enum of possible participant action triggers.
 */
export const ACTION_TRIGGER: {HOVER: ActionTrigger, PERMANENT: ActionTrigger} = {
    HOVER: 'Hover',
    PERMANENT: 'Permanent'
};

export type MediaState = 'DominantSpeaker' | 'Muted' | 'ForceMuted' | 'Unmuted' | 'None';

/**
 * Enum of possible participant media states.
 */
export const MEDIA_STATE: {
    DOMINANT_SPEAKER: MediaState,
    MUTED: MediaState,
    FORCE_MUTED: MediaState,
    UNMUTED: MediaState,
    NONE: MediaState,
} = {
    DOMINANT_SPEAKER: 'DominantSpeaker',
    MUTED: 'Muted',
    FORCE_MUTED: 'ForceMuted',
    UNMUTED: 'Unmuted',
    NONE: 'None'
};

export type QuickActionButtonType = 'Mute' | 'AskToUnmute' | 'None';

/**
 * Enum of possible participant mute button states.
 */
export const QUICK_ACTION_BUTTON: {
    MUTE: QuickActionButtonType,
    ASK_TO_UNMUTE: QuickActionButtonType,
    NONE: QuickActionButtonType
} = {
    MUTE: 'Mute',
    ASK_TO_UNMUTE: 'AskToUnmute',
    NONE: 'None'
};

/**
 * Icon mapping for possible participant audio states.
 */
const MEDIA_ICON_SIZE = 32;

export const AudioStateIcons: {[MediaState]: React$Element<any> | null} = {
    [MEDIA_STATE.DOMINANT_SPEAKER]: (
        <Icon
            className = 'jitsi-icon-dominant-speaker'
            size = { MEDIA_ICON_SIZE }
            src = { IconMicrophoneEmpty } />
    ),
    [MEDIA_STATE.FORCE_MUTED]: (
        <Icon
            color = '#E04757'
            size = { MEDIA_ICON_SIZE }
            src = { IconMicrophoneEmptySlash } />
    ),
    [MEDIA_STATE.MUTED]: (
        <Icon
            color = 'transparent'
            size = { MEDIA_ICON_SIZE }
            src = { IconMicrophoneEmptySlash } />
    ),
    [MEDIA_STATE.UNMUTED]: (
        <Icon
            color = 'transparent'
            size = { MEDIA_ICON_SIZE }
            src = { IconMicrophoneEmpty } />
    ),
    [MEDIA_STATE.NONE]: null
};

/**
 * Icon mapping for possible participant video states.
 */
export const VideoStateIcons = {
    [MEDIA_STATE.FORCE_MUTED]: (
        <Icon
            color = '#E04757'
            size = { MEDIA_ICON_SIZE }
            src = { IconCameraEmptyDisabled } />
    ),
    [MEDIA_STATE.MUTED]: (
        <Icon
            color = 'transparent'
            size = { MEDIA_ICON_SIZE }
            src = { IconCameraEmptyDisabled } />
    ),
    [MEDIA_STATE.UNMUTED]: (
        <Icon
            color = 'transparent'
            size = { MEDIA_ICON_SIZE }
            src = { IconCameraEmpty } />
    ),
    [MEDIA_STATE.NONE]: null
};
