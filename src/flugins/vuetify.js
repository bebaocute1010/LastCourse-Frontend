import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdilAccount } from '@mdi/light-js';

const Vuetify = createVuetify({
    components,
    directives,
    SvgIcon
})

export default Vuetify