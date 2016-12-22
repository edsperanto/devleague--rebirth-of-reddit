function calcTimeDiff(postTime) {
	let localTime = new Date().getTime();
	localTime = Math.round(localTime / 1000); 
	let diffTime = localTime - postTime;
	let str = "";
	if(diffTime < 60) { 
		str = `${Math.floor(diffTime)} second`;
		str += (diffTime >= 2) ? ('s') : ('');
	}else if(diffTime >= 60 && diffTime < 3600) {
		str = `${Math.floor(diffTime / 60)} minute`;
		str += (diffTime / 60 >= 2) ? ('s') : ('');
	}else if(diffTime >= 3600 && diffTime < 86400) {
		str = `${Math.floor(diffTime / 3600)} hour`;
		str += (diffTime / 3600 >= 2) ? ('s') : ('');
	}else if(diffTime >= 86400 && diffTime < 604800) {
		str = `${Math.floor(diffTime / 86400)} day`;
		str += (diffTime / 86400 >= 2) ? ('s') : ('');
	}else if(diffTime >= 604800 && diffTime < 2629743) {
		str = `${Math.floor(diffTime / 604800)} week`;
		str += (diffTime / 604800 >= 2) ? ('s') : ('');
	}else if(diffTime >= 2629743 && diffTime < 31556926) {
		// average 30.44 days per month
		str = `${Math.floor(diffTime / 2629743)} month`;
		str += (diffTime / 2629743 >= 2) ? ('s') : ('');
	}else if(diffTime >= 31556926) {
		// average 365.24 days per year
		str = `${Math.floor(diffTime / 31556926)} year`;
		str += (diffTime / 31556926 >= 2) ? ('s') : ('');
	}
	return str + ' ago';
}