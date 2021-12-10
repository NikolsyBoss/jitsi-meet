import {ColorSchemeRegistry, schemeColor} from '../../../base/color-scheme';
import {
	BoxModel,
	ColorPalette,
	fixAndroidViewClipping
} from '../../../base/styles';
import BaseTheme from '../../../base/ui/components/BaseTheme.native';
import {colors} from "../../../base/ui/Tokens";

export const INSECURE_ROOM_NAME_LABEL_COLOR = BaseTheme.palette.warning03;

const NAVBAR_BUTTON_SIZE = 32;

/**
 * The styles of the feature conference.
 */
export default {

  /**
   * {@code Conference} Style.
   */
  conference: fixAndroidViewClipping({
    alignSelf: 'stretch',
    backgroundColor: BaseTheme.palette.uiBackground,
    flex: 1
  }),

  displayNameContainer: {
    margin: 10
  },

  headerNavigationIcon: {
    // marginLeft: 20,
    color: 'transparent'
  },

  headerNavigationButton: {
    height: BaseTheme.spacing[9],
    // marginTop: BaseTheme.spacing[4],
    width: BaseTheme.spacing[9],
	  alignItems: 'center',
	  justifyContent: 'center',
  },

  /**
   * View that contains the indicators.
   */
  indicatorContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  inviteButtonContainer: {
    // zIndex: 1,
    // paddingRight: 15
    marginLeft: 5,
  },
  inviteButton: {
    iconStyle: {
      color: BaseTheme.palette.icon01,
      // height: '100%',
      fontSize: 40
    },
    underlayColor: BaseTheme.spacing.underlay01,
  },

  lonelyButton: {
    alignItems: 'center',
    borderRadius: 6,
    width: '100%',
    flexDirection: 'row',
    height: BaseTheme.spacing[6],
    justifyContent: 'center',
    paddingHorizontal: 12

  },

  lonelyButtonComponents: {
    marginHorizontal: 6,
    fontWeight: '500',
  },

  lonelyMeetingContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 24, 44, 0.2)',
    // height: 120,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 10,
    padding: BoxModel.padding * 2,
    borderRadius: 6,
  },

  lonelyMessage: {
    paddingBottom: 12,


  },

  pipButtonContainer: {
    marginRight: 5,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // zIndex: 1
  },

  pipButton: {
    iconStyle: {
      // padding: 10,
      color: BaseTheme.palette.icon01,
      fontSize: NAVBAR_BUTTON_SIZE
    },
    underlayColor: BaseTheme.palette.underlay01
  },

  navBarSafeView: {
    position: 'absolute',
    left: 15,
    right: 15,
    top: 20
  },

  navBarWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    // height: 44,
    // justifyContent: 'space-around',
    // paddingHorizontal: 15
  },

  roomTimer: {
    color: BaseTheme.palette.text01,
    fontSize: 12,
    fontWeight: '400',
    paddingHorizontal: 8
  },

  roomTimerView: {
    backgroundColor: ColorPalette.darkBackground75,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    height: 40,
    justifyContent: 'center',
    minWidth: 50
  },

  roomName: {
    color: BaseTheme.palette.text01,
    fontSize: 14,
    fontWeight: '400'
  },

  roomNameView: {
    backgroundColor: ColorPalette.darkBackground,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    flexShrink: 1,
    height: 40,
    // width: "85%",
    justifyContent: 'center',
    paddingHorizontal: 10,
    // marginLeft: 15
  },

  roomNameWrapper: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 5
  },

  /**
   * The style of the {@link View} which expands over the whole
   * {@link Conference} area and splits it between the {@link Filmstrip} and
   * the {@link Toolbox}.
   */
  toolboxAndFilmstripContainer: {
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    left: 0,
    // opacity: 0.7,
    position: 'absolute',
    right: 0,
    top: 0
  },

  insecureRoomNameLabel: {
    backgroundColor: INSECURE_ROOM_NAME_LABEL_COLOR
  },

	efcoHeadContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	efcoHeadText: {
		color: 'white',
		fontSize: 16,
		marginLeft: 15,
	},

};

ColorSchemeRegistry.register('Conference', {
  lonelyButton: {
    backgroundColor: schemeColor('inviteButtonBackground')
  },

  lonelyMessage: {
    color: schemeColor('onVideoText')
  }
});
