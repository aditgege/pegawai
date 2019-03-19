import Vue from 'vue'
import { DatePicker , Card , Alert ,Upload,Button, Dialog ,Notification } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/id'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale'
locale.use(lang)
export default () => {
  Vue.component(DatePicker.name, DatePicker)
  Vue.component(Alert.name, Alert)
  Vue.component(Upload.name , Upload)
  Vue.component(Button.name , Button)
  Vue.component(Dialog.name , Dialog)
  Notification.install = function (Vue, options) {
    Vue.prototype.$notify = Notification
  }
  Vue.use(Notification)
}
