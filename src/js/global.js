document.addEventListener('DOMContentLoaded', function () {
	function getSO() {
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;

		if (/android/i.test(userAgent)) {
			return 'android';
		} else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return 'ios';
		} else {
			return 'desktop';
		}
	}
	const btnLogin = document.querySelector('.nb-btn-login');
	const isOS = getSO();

	if (isOS === 'android') {
		btnLogin.href =
			'https://play.google.com/store/apps/details?id=com.buildpeer';
	} else if (isOS === 'ios') {
		btnLogin.href = 'https://apps.apple.com/mx/app/buildpeer/id1537849493';
	} else {
		btnLogin.href = 'https://app.buildpeer.com/login';
	}

	document.querySelector('.w-locales-list').style.display = 'flex';
});
