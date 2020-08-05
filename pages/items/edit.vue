<template>
  <main>
    <v-data-table
      :headers="headers"
      :items="listItem"
      class="elevation-1"
      @click:row="editItem"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Vật liệu</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500">
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
              >
                Tạo
              </v-btn>
            </template>
            <v-card>
              <v-form ref="form" v-model="valid">
                <v-card-title>
                  <span class="headline">
                    Thêm sửa sản phẩm
                  </span>
                  <v-spacer />
                  <v-icon
                    v-show="checkItemEdited"
                    color="red"
                    @click="dialogDelete = true"
                  >
                    mdi-delete
                  </v-icon>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          required
                          prepend-icon="mdi-star"
                          :rules="nameRules"
                          label="Name"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.cost"
                          required
                          prepend-icon="mdi-cow"
                          :rules="costRules"
                          label="cost"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="submit"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialogDelete"
      max-width="290"
    >
      <v-card>
        <v-card-title
          class="headline"
        >
          Confirm delete item
        </v-card-title>

        <v-card-text>
          This action will permently
          delete all your date data
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="dialogDelete = false"
          >
            Calcel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteItem"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <p>
      Click to item to edit
    </p>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  layout: 'navigation',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Cost', value: 'cost' }
    ],
    valid: false,
    nameRules: [
      (v: string) => !!v || 'Name is required',
      (v: string) => (v && v.length <= 20) ||
        'Name must be less than 20 characters'
    ],
    costRules: [
      (v: number) => !!v || 'Cost is required',
      (v: number) => (v && v > 1000 && v < 50000000) ||
        'Cost must be greater than 1000 and less than 50000000'
    ],
    editedIndex: '',
    editedItem: {
      name: '',
      cost: 0
    },
    defaultItem: {
      name: '',
      cost: 0
    }
  }),

  computed: {
    listItem () {
      return this.$store.state.items.listItem
    },
    checkItemEdited () {
      return this.editedIndex !== ''
    },
    form (): Vue & {
      validate: () => boolean;
      reset: () => void;
      } {
      return this.$refs.form as Vue & {
        validate: () => boolean;
        reset: () => void;
       }
    }
  },

  watch: {
    dialog (val: boolean) {
      if (!val) {
        this.close()
      }
    }
  },

  methods: {
    editItem (item: ItemType) {
      this.editedIndex = this.listItem.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },
    deleteItem () {
      this.$store.commit('items/remove', { ...this.editedItem })
      this.dialogDelete = false
      this.close()
    },
    close () {
      this.dialog = false
      this.form.reset()
      setTimeout(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = ''
      }, 300)
    },
    submit () {
      if (this.form.validate()) {
        if (this.editedIndex !== '') {
          this.$store.commit('items/edit', { ...this.editedItem })
        } else {
          this.$store.commit('items/add', { ...this.editedItem })
        }
        this.close()
      }
    }
  }
})
</script>
