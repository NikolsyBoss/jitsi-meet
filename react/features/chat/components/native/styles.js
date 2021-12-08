// @flow

import {ColorSchemeRegistry, schemeColor} from '../../../base/color-scheme';
import {BoxModel, ColorPalette} from '../../../base/styles';
import BaseTheme from '../../../base/ui/components/BaseTheme.native';

const BUBBLE_RADIUS = 8;

/**
 * The styles of the feature chat.
 *
 * NOTE: Sizes and colors come from the 8x8 guidelines. This is the first
 * component to receive this treating, if others happen to have similar, we
 * need to extract the brand colors and sizes into a branding feature (planned
 * for the future).
 */
export default {

    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },

    /**
     * Wrapper View for the avatar.
     */
    avatarWrapper: {
        marginRight: 8,
        width: 32

    },

    chatLink: {
        color: ColorPalette.blue,

    },
    text: {
        color: ColorPalette.white,
    },

    /**
     * Wrapper for the details together, such as name, message and time.
     */
    detailsWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column',

    },

    emptyComponentWrapper: {
        alignSelf: 'center',
        flex: 1,
        padding: BoxModel.padding,
        paddingTop: '8%',

    },

    /**
     * A special padding to avoid issues on some devices (such as Android devices with custom suggestions bar).
     */
    extraBarPadding: {
        paddingBottom: 30,
    },

    inputBar: {
        alignItems: 'center',
        // borderTopColor: 'rgb(209, 219, 231)',
        // borderTopWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: BoxModel.padding,
    },

    inputField: {
        // color: 'rgb(28, 32, 37)',
        borderRadius: 8,
        backgroundColor: '#35393D',

        color: 'rgb(255,255,255)',
        flex: 1,
        height: 48,
        paddingHorizontal: 15,
    },

    messageBubble: {
        alignItems: 'center',
        borderRadius: BUBBLE_RADIUS,
        flexDirection: 'row',

        // backgroundColor: 'rgba(129, 157, 184, 0)',

    },

    /**
     * Wrapper View for the entire block.
     */
    messageWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 17,
        marginVertical: 4,

    },

    /**
     * Style modifier for the {@code detailsWrapper} for own messages.
     */
    ownMessageDetailsWrapper: {
        alignItems: 'flex-end'
    },

    replyWrapper: {
        alignItems: 'center',
        flexDirection: 'row'

    },

    sendButtonIcon: {
        color: ColorPalette.white,
        fontSize: 22,
        marginLeft: 10
    },

    /**
     * Style modifier for system (error) messages.
     */
    systemMessageBubble: {
        backgroundColor: 'rgb(247, 215, 215)'

    },

    /**
     * Wrapper for the name and the message text.
     */
    textWrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingVertical: 6,

    },

    /**
     * Text node for the timestamp.
     */
    timeText: {
        // color: 'rgb(164, 184, 209)',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 13
    },

    chatContainer: {
        flex: 1,

    },

    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    tabLeftButton: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
    },

    tabRightButton: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }
};

ColorSchemeRegistry.register('Chat', {
    /**
     * Background of the chat screen.
     */
    backdrop: {
        backgroundColor: schemeColor('background'),
        flex: 1
    },

    /**
     * The text node for the display name.
     */
    displayName: {
        // color: schemeColor('displayName'),
        color: ColorPalette.lightGrey,

        fontSize: 13
    },

    emptyComponentText: {
        // color: BaseTheme.palette.ui05,
        color: ColorPalette.lightGrey,
        textAlign: 'center'
    },

    localMessageBubble: {
        // backgroundColor: schemeColor('localMsgBackground'),
        backgroundColor: 'rgba(130, 133, 242, 1)',
        // borderTopRightRadius: 0,
    },

    messageRecipientCancelIcon: {
        color: schemeColor('icon'),
        fontSize: 18
    },

    messageRecipientContainer: {
        alignItems: 'center',
        backgroundColor: schemeColor('privateMsgBackground'),
        flexDirection: 'row',
        padding: BoxModel.padding
    },

    messageRecipientText: {
        color: schemeColor('text'),

        flex: 1
    },

    privateNotice: {
        color: schemeColor('privateMsgNotice'),
        fontSize: 11,
        marginTop: 6
    },

    privateMessageBubble: {

        backgroundColor: schemeColor('privateMsgBackground')
    },

    remoteMessageBubble: {
        // backgroundColor: schemeColor('remoteMsgBackground'),
        backgroundColor: 'rgba(129, 157, 184, 0.3)',

        // borderTopLeftRadius: 0
    },

    replyContainer: {
        alignSelf: 'stretch',
        borderLeftColor: schemeColor('replyBorder'),
        borderLeftWidth: 1,
        justifyContent: 'center'
    },

    replyStyles: {
        iconStyle: {
            color: schemeColor('replyIcon'),
            fontSize: 22,
            padding: 8
        }
    }
});
