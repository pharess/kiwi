// Peter-Test Component
Vue.component("peter-test", {
	props: {
		color: {
			type: String,
			default: "#000"
		},
		times: {
			type: Number,
			default: 1
		}
	},
	template: '<div><div v-for="n in this.times"><p :style="style">{{ content }}</p></div></div>',
	computed: {
		style: function() {
			return {
				color: this.color
			};
		}
	},
	data: function() {
		return {
			content: "Look Peter the component works!"
		}
	},
});

// Root Instance
window.onload = function () {
	var root = new Vue({
		el: "#app",
		data: {}
	})
}