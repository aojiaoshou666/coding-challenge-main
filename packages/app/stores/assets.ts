import { makeAutoObservable } from "mobx"
import { Asset } from "@chain-registry/types"

export default class AssetStore {

    assets: Asset[] = []

    constructor() {
        makeAutoObservable(this)
    }

    seedsWithAssetList(assetList: Asset[]) {
        this.assets = assetList
    }

    addAsset(asset: Asset) {
        this.assets.push(asset)
    }

    getAssetByName(name: string) {
        return this.assets.find(a => a.name == name)
    }

    updateAsset(asset: Asset) {
        const index = this.assets.findIndex(a => a.name === asset.name)
        if (index <= -1) return
        this.assets[index] = asset
    }

    removeAsset(asset: Asset) {
        const index = this.assets.findIndex(a => a.name === asset.name)
        if (index <= -1) return
        this.assets.splice(index, 1)
    }
}