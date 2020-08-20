<template>
	<div
		class="mt-5 mx-sm-12"
	>
		<v-select
			:items="items"
			label="リクエストの種類"
			outlined
			append-icon="fas fa-caret-down"
			v-model="sendData.genre">
		</v-select>
		<div v-if="sendData.genre === 0">
			<v-text-field
				outlined
				label="タイトル名"
				v-model="sendData.content">
			</v-text-field>
		</div>
		<div v-else-if="sendData.genre === 1">
			<v-textarea
				outlined 
				label="リクエスト内容"
				v-model="sendData.content">
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
	</div>
</template>
<script>
export default {
	data: function() {
		return {
			sendStatus:false,
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
			sendData: {
				genre: "",
				content: ""
			}
		};
	},
	methods: {
		async SendRequest() {
			this.sendStatus = true
			try {
				const apiResponse = await this.axios.post(`${this.$store.getters.apiEndpoint}/requests`,this.sendData)
				if (apiResponse.status === 201) {
					this.$emit('Success',"送信に成功しました")
					this.sendStatus = false
					this.sendData = {genre:"",content:""}
				}
			} catch(e) {
				if (e.response.status === 400) {
					this.$emit('Error',"送信に失敗しました<空白があります>")
					this.sendStatus = false
				} else {
					this.sendStatus = false
                        this.$router.push('/500')
				}
			}
		}
	}
};
</script>