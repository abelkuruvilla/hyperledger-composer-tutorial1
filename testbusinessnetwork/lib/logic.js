
'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Track the trading of commodity from one to another
 * @param {org.abel.mynetwork.Trade} trade
 * @transaction
 */
async function tradeCommodity(trade) {
   trade.commodity.owner = tade.newOwner;
   let assetRegistry = await getAssetRegistry('org.abel.mynetwork.Commodity')

   let tradeNotification = getFactory().newEvent('org.abel.mynetwork','TradeNotification')
   tradeNotification.commodity = trade.commodity
   emit(tradeNotification)

   await assetRegistry.update(trade.commodity)
}

/**
 * Remove all high volume commodities
 * @param {org.abel.mynetwork.RemoveHighQuantityCommodities} remove - the remove to be processed
 * @transaction
 */
async function removeHighQuantityCommodities(remove) {
    let assetRegistry = await('org.abel.mynetwork.Commodity')
    let results = await query('selectCommoditiesWithHighQuantity')
    
    for(let n=0;n<results.length;n++){
        let trade = results[n]
        //emit a notification that a trade was removed
        let removeNotification = getFactory().newEvent('org.abel.mynetwork','RemoveNotification')
        removeNotification.commodity = trade
        emit (removeNotification)
        await assetRegistry.remove(trade)
    }
}
