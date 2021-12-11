// @flow

import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View, ViewComponent} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {openDialog} from '../../../base/dialog';
import JitsiScreen from '../../../base/modal/components/JitsiScreen';
import {
	getParticipantCount,
	isLocalParticipantModerator
} from '../../../base/participants';
import {equals} from '../../../base/redux';
import {
	AddBreakoutRoomButton,
	AutoAssignButton,
	LeaveBreakoutRoomButton
} from '../../../breakout-rooms/components/native';
import {
	CollapsibleRoom
} from '../../../breakout-rooms/components/native/CollapsibleRoom';
import {
	getBreakoutRooms,
	getCurrentRoomId,
	isInBreakoutRoom
} from '../../../breakout-rooms/functions';
import MuteEveryoneDialog
	from '../../../video-menu/components/native/MuteEveryoneDialog';

import {ContextMenuMore} from './ContextMenuMore';
import HorizontalDotsIcon from './HorizontalDotsIcon';
import LobbyParticipantList from './LobbyParticipantList';
import MeetingParticipantList from './MeetingParticipantList';
import styles from './styles';
import {doInvitePeople} from "../../../invite";
import BaseEfcoBg from "../../../efcoBase/bg/BaseEfcoBG";

/**
 * Participant pane.
 *
 * @returns {React$Element<any>}
 */
const ParticipantsPane = () => {
	const dispatch = useDispatch();
	const openMoreMenu = useCallback(() => dispatch(openDialog(ContextMenuMore)), [dispatch]);
	const isLocalModerator = useSelector(isLocalParticipantModerator);
	const muteAll = useCallback(() => dispatch(openDialog(MuteEveryoneDialog)),
		[dispatch]);
	const {t} = useTranslation();

	const {hideAddRoomButton} = useSelector(state => state['features/base/config']);
	const {conference} = useSelector(state => state['features/base/conference']);

	// $FlowExpectedError
	const _isBreakoutRoomsSupported = conference?.getBreakoutRooms()?.isSupported();
	const currentRoomId = useSelector(getCurrentRoomId);
	const rooms: Array<Object> = Object.values(useSelector(getBreakoutRooms, equals))
		.filter((room: Object) => room.id !== currentRoomId)
		.sort((p1: Object, p2: Object) => (p1?.name || '').localeCompare(p2?.name || ''));
	const inBreakoutRoom = useSelector(isInBreakoutRoom);
	const participantsCount = useSelector(getParticipantCount);

	const onInvite = () => dispatch(doInvitePeople());

	return (
		<BaseEfcoBg>
			<JitsiScreen
				style={styles.participantsPane}>
				<ScrollView bounces={false} style={styles.participantsList}>
					<LobbyParticipantList/>
					<MeetingParticipantList/>
					{!inBreakoutRoom
						&& isLocalModerator
						&& participantsCount > 2
						&& rooms.length > 1
						&& <AutoAssignButton/>}
					{inBreakoutRoom && <LeaveBreakoutRoomButton/>}
					{_isBreakoutRoomsSupported
						&& rooms.map(room => (<CollapsibleRoom
							key={room.id}
							room={room}/>))}
					{/*{_isBreakoutRoomsSupported && !hideAddRoomButton && isLocalModerator*/}
					{/*    && <AddBreakoutRoomButton />}*/}
				</ScrollView>
				{
					isLocalModerator
					&&
					<View style={styles.muteAllContainer}>
						<Button
							children={t('participantsPane.actions.muteAll')}
							labelStyle={styles.muteAllLabel}
							mode='contained'
							onPress={muteAll}
							style={[styles.muteAllMoreButton, styles.elevation]}/>
					</View>}

				{
					isLocalModerator
					&& <>
						{/*<Button*/}
						{/*    icon = { HorizontalDotsIcon }*/}
						{/*    labelStyle = { styles.moreIcon }*/}
						{/*    mode = 'contained'*/}
						{/*    onPress = { openMoreMenu }*/}
						{/*    style = { styles.moreButton } />*/}
						<View style={styles.footer}>
							<Button
								children={t('participantsPane.actions.invite')}
								labelStyle={styles.inviteLabel}
								mode='contained'
								onPress={onInvite}
								style={styles.inviteButton}/>
						</View>
					</>
				}
				{/*<View>*/}
				{/*    <Button*/}
				{/*        children = { t('participantsPane.actions.invite') }*/}
				{/*        labelStyle = { styles.inviteLabel }*/}
				{/*        mode = 'contained'*/}
				{/*        onPress = { onInvite }*/}
				{/*        style = { styles.inviteButton } />*/}
				{/*</View>*/}
			</JitsiScreen>
		</BaseEfcoBg>
	);
};

export default ParticipantsPane;
