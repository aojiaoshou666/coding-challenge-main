import { makeAutoObservable } from "mobx"
import { Asset } from "@chain-registry/types"
import AssetStore from "./assets"

export interface PoolsData {
    id: string
    token1: { name: string; imgSrc: string }
    token2: { name: string; imgSrc: string }
    poolLiquidity: number
    apr: number
    myLiquidity: number
    myBoundedAmount: number
    longestDaysUnbonding: boolean
}

export default class PoolStore {

    poolsDataList: PoolsData[] = []
    assetStore: AssetStore = undefined

    constructor(assetStore: AssetStore) {
        this.assetStore = assetStore
        makeAutoObservable(this)
    }
    addPoolWithAssetNames(name1: string, name2: string): boolean {
        const asset1 = this.assetStore.getAssetByName(name1)
        const asset2 = this.assetStore.getAssetByName(name2)
        if (asset1 && asset2) {
            this.addPool(asset1, asset2)
            return true
        }
        return false
    }

    addPool(asset1: Asset, asset2: Asset) {
        this.poolsDataList.push({
            id: generateId(),
            token1: { name: asset1.name, imgSrc: asset1.logo_URIs.png },
            token2: { name: asset2.name, imgSrc: asset2.logo_URIs.png },
            poolLiquidity: generatePoolLiquidity(),
            apr: generateAPR(),
            myLiquidity: generateMyLiquidity(),
            myBoundedAmount: generateMyLiquidity(),
            longestDaysUnbonding: Math.random() < 0.5,
        })
        this.assetStore.removeAsset(asset1)
        this.assetStore.removeAsset(asset2)
    }


}

function getShuffledArr(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr
}

function generateId() {
    const timeString = new Date().getTime().toString()
    return timeString.slice(timeString.length - 6, timeString.length)
}

function generatePoolLiquidity() {
    return parseInt(
        getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .toString()
            .replaceAll(",", "")
    )
}

function generateMyLiquidity() {
    return parseInt(
        getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .toString()
            .slice(0, 5)
            .replaceAll(",", "")
    )
}

function generateAPR() {
    return (
        parseInt(
            getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                .toString()
                .slice(0, 7)
                .replaceAll(",", "")
        ) / 100
    )
}
