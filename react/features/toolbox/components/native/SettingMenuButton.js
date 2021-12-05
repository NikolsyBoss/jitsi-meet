import {connect} from '../../../base/redux';
import {getFeatureFlag, OVERFLOW_MENU_ENABLED} from '../../../base/flags';
import {
    AbstractButton,
    type AbstractButtonProps
} from '../../../base/toolbox/components';
import gearIcon from '../../../base/icons/svg/newDisigne/gearIcon.svg';
import {openDialog} from '../../../base/dialog';
import {translate} from '../../../base/i18n';
import SettingMenu from "./SettingMenu";


type Props = AbstractButtonProps & {
    dispatch: Function
};

class SettingMenuButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.moreActions';
    icon = gearIcon;
    label = 'toolbar.moreActions';
    _handleClick() {
        this.props.dispatch(openDialog(SettingMenu));
    }
}

function _mapStateToProps(state): Object {
    const enabledFlag = getFeatureFlag(state, OVERFLOW_MENU_ENABLED, true);

    return {
        visible: enabledFlag
    };
}

export default translate(connect(_mapStateToProps)(SettingMenuButton));
