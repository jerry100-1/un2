<template>
    <view>
        <web-view :webview-styles="webviewStyles" src="http://www.hnlxyj.com/wx/html/my/agreement.html"></web-view>
    </view>
</template>

<script>

    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        }
	};

	 
</script>

<style>

</style>
