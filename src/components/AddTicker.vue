<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            @input="addHint"
            v-model="ticker"
            @keydown.enter="add(ticker)"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
        </div>
        <div class="flex bg-white shadow-md p-1 rounded-md flex-wrap">
          <span
            v-for="(h, idx) in hints"
            :key="idx"
            @click="add(h)"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
          >
            {{ h }}
          </span>
        </div>
        <div v-if="errPreviouslyAdded" class="text-sm text-red-600">
          Такой тикер уже добавлен
        </div>
      </div>
    </div>
    <add-button
      class="my-4"
      @click="add(ticker)"
      :disabled="disabled"
      type="button"
    />
  </section>
</template>

<script>
import AddButton from "./AddButton";

export default {
  components: {
    AddButton,
  },

  props: {
    disabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    coinList: {
      type: Object,
      required: true,
    },
  },

  emits: {
    "add-ticker": (value) => typeof value === "string" && value.length > 0,
  },

  data() {
    return {
      ticker: "",
      hints: [],
      errPreviouslyAdded: false,
    };
  },

  methods: {
    add(hint) {
      if (this.ticker.length === 0) {
        return;
      }

      this.$emit("add-ticker", hint);
      this.ticker = "";
      this.hints = [];
      this.errPreviouslyAdded = false;
    },

    addHint() {
      if (this.ticker.length) {
        this.errPreviouslyAdded = false;
        const newArr = [];

        for (let coin in this.coinList) {
          if (newArr.length > 3) {
            return;
          }
          let symbol = this.coinList[coin].Symbol;
          let name = this.coinList[coin].FullName;
          if (symbol.toLowerCase() === this.ticker.toLowerCase()) {
            newArr.unshift(symbol);
          } else if (name.toLowerCase().includes(this.ticker.toLowerCase())) {
            name = symbol;
            newArr.push(name);
          } else {
            this.hints = [];
          }
          this.hints = newArr;
        }
      }
    },
  },
};
</script>
