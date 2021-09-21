import { ADDRESS_ZERO, BIG_INT_ZERO } from 'const'
import { Address, BigInt, dataSource, ethereum } from '@graphprotocol/graph-ts'

import { Pool } from '../../generated/schema'
import { getMiniChef } from './minichef'

export function getPool(pid: BigInt, block: ethereum.Block): Pool {
  const miniChef = getMiniChef(block)

  let pool = Pool.load(pid.toString())

  if (pool === null) {
    pool = new Pool(pid.toString())
    pool.miniChef = miniChef.id
    pool.pair = ADDRESS_ZERO
    pool.allocPoint = BIG_INT_ZERO
    pool.lastRewardTime = BIG_INT_ZERO
    pool.accMetavicePerShare = BIG_INT_ZERO
    pool.slpBalance = BIG_INT_ZERO
    pool.userCount = BIG_INT_ZERO
  }

  pool.timestamp = block.timestamp
  pool.block = block.number
  pool.save()

  return pool as Pool
}
