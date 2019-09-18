<script>
	export default {
		onLaunch: function() {
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
/* 	@import "./iconfont.css"; */
@import url("static/fontnew/iconfont.css");
	/*每个页面公共css */
	body,
	page {
		min-height: 100%;
		display: flex;
		font-size: 32upx;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */



	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #fff;
		padding: 30upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 32upx;
	}

	.input-row .title {
		width: 180upx;
		height: 50upx;
		min-height: 100upx;
		padding: 20upx 0;
		padding-left: 30upx;
		line-height: 60upx;
		box-sizing: border-box;
	}
	/* 选中的样式 */
	uni-checkbox .uni-checkbox-input{
		border-radius: 50%;
		background: transparent;
		vertical-align: middle;
	}
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	    color: #fff !important;
	    background: #007aff;
	}
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
		background: #ee3535;
		border: 1px solid transparent;
	}
	.l{
		float:left;
	}
	.r{
		float:right;
	}
	/*没数据*/
	.no{
		width:750upx;
		text-align: center;
	}
	.noData{
		width:307upx;
		height:200upx;
		margin: 200upx 222upx 20upx;
	}
	/*模态层*/

</style>
