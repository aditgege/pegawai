import Vue from 'vue'
import { DatePicker , Card , Alert } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/id'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale'
locale.use(lang)
export default () => {
  Vue.component(DatePicker.name, DatePicker)
  Vue.component(Card.name, Card)
  Vue.component(Alert.name, Alert)
}
