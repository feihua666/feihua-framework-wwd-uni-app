/**
数据验证（表单验证）
来自 grace.hcoder.net
作者 hcoder 深海
*/
module.exports = {
	error:'',
	check : function (data, rule){
		for(var i = 0; i < rule.length; i++){
			if (!rule[i].checkType){return true;}
			if (!rule[i].name) {return true;}
			if (!rule[i].errorMsg) {return true;}
			if (!data[rule[i].name]) {this.error = rule[i].errorMsg; return false;}
			switch (rule[i].checkType){
				case 'string':
					var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
				break;
				case 'int':
					var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				break;
				case 'between':
					if (!this.isNumber(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'betweenD':
					var reg = /^-?[1-9][0-9]?$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'betweenF':
					var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
					if (!reg.test(data[rule[i].name])){this.error = rule[i].errorMsg; return false;}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'same':
					if (data[rule[i].name] != rule[i].checkRule) { this.error = rule[i].errorMsg; return false;}
				break;
				case 'notsame':
					if (data[rule[i].name] == rule[i].checkRule) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'email':
					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'phoneno':
					var reg = /^1[0-9]{10,10}$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'zipcode':
					var reg = /^[0-9]{6}$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'reg':
					var reg = new RegExp(rule[i].checkRule);
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'in':
					if(rule[i].checkRule.indexOf(data[rule[i].name]) == -1){
						this.error = rule[i].errorMsg; return false;
					}
				break;
				case 'notnull':
					if(data[rule[i].name] == null || data[rule[i].name].length < 1){this.error = rule[i].errorMsg; return false;}
				break;
					// 以下是自己添加
                case 'password':
                    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
                    if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
                    break;
                case 'mobile':
                    var reg = /(13|14|15|16|18|17)[0-9]{9}/;
                    if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
                    break;
			}
		}
		return true;
	},
	isNumber : function (checkVal){
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	},
    checkForm: function (data, rule) {
        let checkRes = this.check(data, rule);
        if(checkRes){
            return true;
        }else{
            uni.showToast({ title: this.error, icon: "none" });
            return false
        }
    }
}
