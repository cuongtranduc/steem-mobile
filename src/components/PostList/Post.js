import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { fromNow } from '../../utils/time';
import { sbdToDollar } from '../../utils/money';
import * as Navigation from '../../utils/navigation'

const screenHeight = Dimensions.get('window').height;

const Post = ({ item }) => {
	const metaData = JSON.parse(item.json_metadata);

	const navigateToDetail = () => {
		Navigation.navigate('PostDetail', {data: [item.author, item.permlink]})
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					style={styles.avatar}
					source={{uri: 'https://cdn.steemitimages.com/DQmReiMpbMJuD48KwaiZiBHYWkqYQp4J6mDxDJsn9KVZpnt/new-steem-account.png'}}
				/>
				<View style={styles.postMetadata}>
					<Text style={styles.author}>{item.author}</Text>
					<Text style={styles.fromNow}>{fromNow(item.last_update)}</Text>
				</View>
			</View>
			{
				metaData.image && metaData.image[0] && (
					<TouchableOpacity onPress={navigateToDetail}>
						<Image
							style={styles.thumbnail}
							source={{uri: metaData.image[0]}}
						/>
					</TouchableOpacity>
				)
			}
			<View>
				<Text numberOfLines={2} style={styles.title}>{item.title}</Text>
			</View>
			<View style={styles.footer}>
				<Text style={styles.payout}>{sbdToDollar(item.pending_payout_value)}</Text>
				<View style={{marginLeft: 15, flexDirection: 'row', alignItems: 'center'}}>
					<Icon name="chevron-up" size={20} />
					<Text style={styles.votes}>{item.active_votes.length}</Text>
				</View>
				<View style={{marginLeft: 15, flexDirection: 'row', alignItems: 'center'}}>
					<Icon name="comment" size={18} />
					<Text style={styles.votes}>{item.children}</Text>
				</View>
				<View style={{flex: 1}} />
				<View style={{marginRight: 15, flexDirection: 'row', alignItems: 'center'}}>
					<Icon name="share" size={20} />
				</View>
			</View>
		</View>		
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
	header: {
		flexDirection: 'row',
	},
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
	},
	author: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#333'
	},
	fromNow: {
		fontSize: 14,
		color: 'gray'
	},
	thumbnail: {
		marginTop: 15,
		height: screenHeight / 5,
		width: '100%'
	},
	postMetadata: {
		paddingLeft: 15,
		justifyContent: 'center'
	},
	title: {
		marginTop: 15,
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333'
	},
	footer: {
		marginTop: 15,
		flexDirection: 'row',
	},
	payout: {
		fontSize: 18,
		color: '#333'
	},
	votes: {
		fontSize: 18,
		color: '#333'
	}
})

export default Post;