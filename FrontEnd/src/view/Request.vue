<template>
	<div
		class="mt-5 mx-sm-12"
	>
		<v-alert
			color="success"
			v-model="alert"
			dismissible
			close-icon="fas fa-times"
			icon="far fa-check-circle"
			dark
		>
			送信が完了しました!
		</v-alert>
		<v-alert
			color="error"
			v-model="warningAlert"
			dismissible
			close-icon="fas fa-times"
			icon="fas fa-exclamation-triangle"
			dark
		>
			{{ WAmessage }}
		</v-alert>
		<v-select
			:items="items"
			label="リクエストの種類"
			outlined
			append-icon="fas fa-caret-down"
			v-model="SendData.select">
		</v-select>
		<div v-if="SendData.select === 0">
			<v-text-field
				outlined
				label="タイトル名"
				v-model="SendData.content.title">
			</v-text-field>
		</div>
		<div v-else-if="SendData.select === 1">
			<v-textarea
				outlined 
				label="リクエスト内容"
				v-model="SendData.content.message">
			</v-textarea>
		</div>
		<div
			class="d-flex justify-end"
		>
			<v-btn
				color="success"
				class="px-6 py-2"
				@click="SendRequest"
				:loading="sendStatus"
			>
				送信
			</v-btn>
		</div>
		{{ SendData.select }} <br>
		{{ SendData.content.title }} <br>
		{{ SendData.content.message }} <br>
	</div>
</template>
<script>
export default {
	data: function() {
		return {
			sendStatus:false,
			alert:false,
			warningAlert:false,
			WAmessage:"エラーが発生しました",
			items: [
				{
					text: "図書リクエスト",
					value: 0
				},
				{
					text: "その他",
					value: 1
				}
			],
			SendData: {
				select: "",
				content: {
					title:"",
					message:""
				}
			}
		};
	},
	methods: {
		SendRequest: function() {
			this.sendStatus = true
			this.axios.post('http://192.168.1.43:3000/',this.SendData)
				.then((res) => {
					console.log(res.data)
					if (res.data.status === "success") {
						this.sendStatus = false
						this.alert = true
						this.SendData = {select:"",content:{title:"",message:""}}
						setTimeout(() => {
							this.alert = false
						},"4000")
					} else {
						this.sendStatus = false
						this.warningAlert = true
						this.WAmessage = res.data.message
					}
				})
		}
	}
};
</script>