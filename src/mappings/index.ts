import { ExtrinsicContext, EventContext, StoreContext } from '@subsquid/hydra-common'
import { getOrCreate } from './helpers/entity-utils'
import  {Account, WorkReport} from '../generated/model'


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
