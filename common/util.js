import {request} from '@/common/request.js'

let authorize_data = {
	userLocation:{
		auth_text:"getLocation",
		auth_desc:"地理位置"
	},
	address:{
		auth_text:"chooseAddress",
		auth_desc:"地址信息"
	}
}
export function getLocation({authorize_text="userLocation",need_tips=true}={}){
	// uni.getSetting({
	// 	success(res) {
	// 		console.log(res)
	// 	}
	// })
	return new Promise((resolve,reject)=>{
		
		uni.authorize({
			geocode:true,
			scope:`scope.${authorize_text}`,
			success(res) {
				if(res.errMsg == "authorize:ok") {
					uni[authorize_data[authorize_text].auth_text]({
						success(res){
							resolve({latitude:parseFloat(res.latitude.toFixed(12)),longitude:parseFloat(res.longitude.toFixed(12))})
						},
						fail(err) {
							reject(err)
						}
					})
				}
			},
			fail(res) {
				console.log(res)
				
				if(res.errMsg.indexOf("deny") != -1) {
					uni.showModal({
						title:`授权被拒绝`,
						content:`为了更好的体验,请打开${authorize_data[authorize_text].auth_desc}授权`,
						success(res) {
							if(res.confirm) {
								uni.openSetting({
									success() {
										uni.getLocation({
											success(res){
												resolve({latitude:parseFloat(res.latitude.toFixed(12)),longitude:parseFloat(res.longitude.toFixed(12))})
											},
											fail(err) {
												reject(err)
											}
										})
									}
								})
							}
						}
					})
					
				}else {
					reject()
				}
			}
		})
	})
};
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

export let getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}