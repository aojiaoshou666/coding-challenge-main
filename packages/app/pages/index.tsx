import React, { useState, useEffect } from "react";
import Pools from '../components/pools-list';
import PoolStore from "../stores/pools";
import AssetStore from "../stores/assets";
import { asset_list } from "@chain-registry/osmosis";

const assetStore = new AssetStore()
assetStore.seedsWithAssetList(asset_list.assets)

const poolStore = new PoolStore(assetStore)

console.log('assets: ', poolStore.assetStore.assets)

export default function Index() {
  return (<>
    <Pools poolStore={poolStore} />
  </>
  );
}
