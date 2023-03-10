<template>
  <div class="flex flex-col">
    <p
      class="hover:bg-black/40 flex gap-4 items-center px-10"
      v-for="(wallet, index) in AllDefaultWallets"
      :key="index"
      @click="select(wallet.name)"
    >
      <img class="w-10" :src="wallet.iconUrl" alt="" />
      {{ wallet.name }}
    </p>

    {{ currentWallet }}
    <button @click="transaction">fuck</button>
  </div>
</template>

<script lang="ts" setup>
import { StandardWalletAdapterWallet } from "@mysten/wallet-standard";
import { getWallets, Wallet } from "@wallet-standard/core";
import { find } from "lodash-es";
import { WalletAdapter } from "~~/config/wallet-adapter";
import { AllDefaultWallets } from "../Wallet/config/index";

const detectedWallets = ref<any[]>([]);

function isStandardWalletAdapterCompatibleWallet(
  wallet: Wallet
): wallet is StandardWalletAdapterWallet {
  return (
    "standard:connect" in wallet.features &&
    "standard:events" in wallet.features &&
    "sui:signAndExecuteTransaction" in wallet.features
  );
}

const currentWallet = ref<any>();

const select = (name: string) => {
  const targetWallet = find(
    detectedWallets.value,
    (w: any) => toRaw(w).name === name
  );

  // disconnect current
  if (currentWallet.value) {
    toRaw(currentWallet.value).disconnect();
  }

  toRaw(targetWallet).connect();
  currentWallet.value = targetWallet;
};

const transaction = async () => {
  if (!currentWallet.value) return;

  try {
    const data = {
      packageObjectId: "0x2",
      module: "devnet_nft",
      function: "mint",
      typeArguments: [],
      arguments: [
        "name",
        "capy",
        "https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop",
      ],
      gasBudget: 10000,
    };

    const resData = await toRaw(currentWallet.value).signAndExecuteTransaction({
      transaction: {
        kind: "moveCall",
        data,
      },
    });
    // const resData = await executeMoveCall(data);
    console.log("executeMoveCall success", resData);
    alert("executeMoveCall succeeded (see response in the console)");
  } catch (e) {
    console.error("executeMoveCall failed", e);
    alert("executeMoveCall failed (see response in the console)");
  }
};

onMounted(() => {
  detectedWallets.value = [...getWallets().get()];

  detectedWallets.value = detectedWallets.value.map((wallet: any) => {
    return new WalletAdapter(toRaw(wallet));
  });
});
</script>
