<template>
	<v-form class="mt-5 mx-sm-12" ref="form" v-model="isValid">
		<v-select
			label="リクエストの種類"
			:items="items"
			v-model="sendData.genre"
			:rules="[v => !!v || 'リクエストのジャンルの選択は必須です']"
			outlined
			append-icon="fas fa-caret-down">
		</v-select>
		<div v-if="sendData.genre === 0">
			<v-text-field
				label="タイトル名"
				v-model="sendData.content"
				:rules="[v => !!v || 'タイトル名は必須です']"
				outlined>
			</v-text-field>
		</div>
		<div v-else-if="sendData.genre === 1">
			<v-textarea
				label="リクエスト内容"
				v-model="sendData.content"
				:rules="[v => !!v || 'リクエスト内容は必須です']"
				outlined>
			</v-textarea>
		</div>
		<div class="d-flex justify-end">
			<v-btn
				:loading="isSending"
				@click="sendRequest"
				color="success"
				class="px-6 py-2">
				送信
			</v-btn>
		</div>
	</v-form>
</template>
<script>
export default {
	data: function() {
		return {
			isSending: false,
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
			},
			isValid: true
		};
	},
	methods: {
		async sendRequest() {
			this.$refs.form.validate()
			if (this.isValid) {
				this.isSending = true
				await this.managerApi.post('/requests', this.sendData)
					.then(() => {
						Object.assign(this.$data.sendData, this.$options.data().sendData)
						this.$emit('success',"送信に成功しました")
					})
					.catch(() => {
						this.$emit('error',"送信に失敗しました")
					})
				this.isSending = false
			}
		}
	}
};
</script>