import "vuetify/styles";
import "vuetify/dist/vuetify.min.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataTable, VDataTableVirtual, VDataTableFooter } from 'vuetify/labs/VDataTable'
import SvgIcon from "@jamescoyle/vue-icon";

const Vuetify = createVuetify({
  components: {
    ...components,
    VDataTable,
    VDataTableVirtual,
    VDataTableFooter
  },
  directives,
  SvgIcon,
});

export default Vuetify;
