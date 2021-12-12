// @flow

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {Image, View, Text, NativeModules} from 'react-native';

import {Chat, ChatAndPolls} from '../../../chat';
import {SharedDocument} from '../../../etherpad';
import AddPeopleDialog
	from '../../../invite/components/add-people-dialog/native/AddPeopleDialog';
import LobbyScreen from '../../../lobby/components/native/LobbyScreen';
import {ParticipantsPane} from '../../../participants-pane/components/native';
import {getDisablePolls} from '../../functions';

import Conference from './Conference';
import {
	conferenceNavigationRef
} from './ConferenceNavigationContainerRef';
import {
	chatScreenOptions,
	conferenceScreenOptions,
	inviteScreenOptions,
	lobbyScreenOptions,
	navigationContainerTheme,
	participantsScreenOptions, presentationScreenOptions,
	sharedDocumentScreenOptions
} from './ConferenceNavigatorScreenOptions';
import {screen} from './routes';
import styles from "./styles";
import {
	getLocalParticipant, getNormalizedDisplayName,
	getParticipantCount,
	getParticipantCountWithFake,
	getParticipantDisplayName,
	getRemoteParticipants, setLoadableAvatarUrl
} from "../../../base/participants";
import BaseTheme from "../../../base/ui/components/BaseTheme";
import {Avatar} from "../../../base/avatar";
import {shouldRenderInviteButton} from "../../../participants-pane/functions";
import {
	getBreakoutRooms,
	getCurrentRoomId
} from "../../../breakout-rooms/functions";
import {translate} from "../../../base/i18n";
import {connect} from "../../../base/redux";
import {withTheme} from "react-native-paper";
import {getUnreadPollCount} from "../../../polls/functions";

const ConferenceStack = createStackNavigator();


const EfcoHeadChat = () => {

	const localParticipant = useSelector(getLocalParticipant);

	// const {AppInfo} = NativeModules;
	// const {avatar} = AppInfo.getConstants()
	// const dispatch = useDispatch()
	//
	// useEffect(() => {
	// 	dispatch(setLoadableAvatarUrl(localParticipant?.id, avatar))
	// }, [])

	const displayName = localParticipant?.name;

	return (
		<View style={styles.efcoHeadContainer}>
			<Avatar
				className='participant-avatar'
				// displayName={displayName}
				participantId={localParticipant?.id}
				size={40}/>
			<Text style={styles.efcoHeadText}> {displayName}</Text>
		</View>
	)
};

function mapStateToProps(state) {
	return {propOne: state.propOne};
}


const ConferenceNavigationContainer = () => {
	const isPollsDisabled = useSelector(getDisablePolls);
	const ChatScreen
		= Chat;
	// ? Chat
	// : ChatAndPolls;
	const chatScreenName
		= isPollsDisabled
		? screen.conference.chat
		: screen.conference.chatandpolls.main;
	const {t} = useTranslation();
	const participantsCount = useSelector(getParticipantCount);

	return (
		<SafeAreaProvider>
			<NavigationContainer
				independent={true}
				ref={conferenceNavigationRef}
				theme={navigationContainerTheme}>
				<ConferenceStack.Navigator
					initialRouteName={screen.conference.main}
					mode='modal'>
					<ConferenceStack.Screen
						component={Conference}
						name={screen.conference.main}
						options={conferenceScreenOptions}/>
					<ConferenceStack.Screen
						component={ChatScreen}
						name={chatScreenName}
						options={{
							...chatScreenOptions,
							headerStyle: {
								...presentationScreenOptions.headerStyle,
								height: 65,
							},
							headerTitle: () => <EfcoHeadChat/>
							// title: t('chat.title')
						}}/>
					<ConferenceStack.Screen
						component={ParticipantsPane}
						name={screen.conference.participants}
						options={{
							...participantsScreenOptions,
							headerTitleStyle: {
								fontSize: 16,
								color: 'white',
							},
							title: t('participantsPane.headings.participantsList', {count: participantsCount})
						}}/>
					<ConferenceStack.Screen
						component={LobbyScreen}
						name={screen.lobby}
						options={lobbyScreenOptions}/>
					<ConferenceStack.Screen
						component={AddPeopleDialog}
						name={screen.conference.invite}
						options={{
							...inviteScreenOptions,
							title: t('addPeople.add')
						}}/>
					<ConferenceStack.Screen
						component={SharedDocument}
						name={screen.conference.sharedDocument}
						options={{
							...sharedDocumentScreenOptions,
							title: t('documentSharing.title')
						}}/>
				</ConferenceStack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default ConferenceNavigationContainer;
