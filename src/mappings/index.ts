import { ExtrinsicContext, EventContext, StoreContext } from '@subsquid/hydra-common'
import { getOrCreate } from './helpers/entity-utils'
import  {Account, WorkReport, JoinGroup, StorageOrder} from '../generated/model'


export function stringifyArray(list: any[]): any[] {
  let listStr : any[] = [];
  list = list[0]
  for (let vec of list){
    for (let i = 0; i < vec.length; i++){
      vec[i] = String(vec[i]);
    }
    listStr.push(vec);
  }
  return listStr
}

export async function joinGroupSuccess({
  store,
  event,
  block,
  extrinsic,
}: EventContext & StoreContext): Promise<void> {
  const memberId = String(event.params[0].value);
  const account = await getOrCreate(store, Account, memberId);
  
  const joinGroup = new JoinGroup();
  
  joinGroup.id = event.id;
  joinGroup.member = account;
  joinGroup.owner = String(event.params[1].value);

  joinGroup.blockHash = block.hash;
  joinGroup.blockNum = block.height;
  joinGroup.createdAt = new Date(block.timestamp);
  joinGroup.extrinisicId = extrinsic?.id;
  //console.log(joinGroup);
  await store.save(account);
  await store.save(joinGroup);
}

export async function fileSuccess({
  store,
  event,
  block,
  extrinsic,
}: EventContext & StoreContext): Promise<void> {
  if (String(extrinsic?.method) === 'placeStorageOrder'){
    const accountId = String(event.params[0].value);
    const account = await getOrCreate(store, Account, accountId);

    const storageOrder = new StorageOrder();
    storageOrder.id = event.id;
    storageOrder.account = account;
    storageOrder.fileCid =  String(event.params[1].value);
    storageOrder.blockHash = block.hash;
    storageOrder.blockNum = block.height;
    storageOrder.createdAt = new Date(block.timestamp);
    storageOrder.extrinisicId = extrinsic?.id;
    //console.log(storageOrder);
    await store.save(account);
    await store.save(storageOrder);
  }
}

export async function workReportSuccess({
  store,
  event,
  block,
  extrinsic,
}: EventContext & StoreContext): Promise<void> {
  const accountId = String(event.params[0].value);
  const accountPr = getOrCreate(store, Account, accountId);
  const addedFilesObjPr = extrinsic?.args.find(arg => arg.name === "addedFiles");
  const deletedFilesObjPr = extrinsic?.args.find(arg => arg.name === "deletedFiles");

  const [account,addFObj,delFObj] = await Promise.all([accountPr,addedFilesObjPr,deletedFilesObjPr]);
  
  const workReport = new WorkReport();
  
  //console.log(addFObj);
  //console.log(delFObj);
  
  workReport.addedFiles = stringifyArray(Array(addFObj?.value))
  workReport.deletedFiles = stringifyArray(Array(delFObj?.value))
  if ((workReport.addedFiles.length > 0) || (workReport.deletedFiles.length > 0))
  { workReport.account = account;

  workReport.id = event.id;
  workReport.blockHash = block.hash;
  workReport.blockNum = block.height;
  workReport.createdAt = new Date(block.timestamp);
  workReport.extrinisicId = extrinsic?.id;
  
  await store.save(account);
  await store.save(workReport);
  }
}
