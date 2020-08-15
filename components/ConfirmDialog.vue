<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="headline">
          Confirm {{ title }}
        </v-card-title>

        <v-card-text>
          {{ comment }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="$emit('input', false)"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="$emit('confirm')"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ConfirmDialog extends Vue {
  @Prop({ required: true })
  readonly value!: boolean

  @Prop()
  readonly title!: string

  @Prop()
  readonly comment!: string
}
</script>
