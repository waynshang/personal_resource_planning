// import { put, select } from "redux-saga/effects";
// import { change, getFormValues } from "redux-form";
// import { DirectUpload } from "activestorage";

// import { NEW_MAIL_RECIPIENT_ALERT, NEW_MAIL_RECIPIENT_NAME, NEW_MAIL_RECIPIENT_MAIL } from 'panels/NewMailRecipientAlert';
// import { LINK_TO_LEAD_ALERT, LINK_TO_LEAD_NAME, LINK_TO_LEAD_LEADID } from 'panels/LinkToLeadAlert';
// import { SUPPORT_TICKET_ALERT_SETTINGS } from 'panels/SupportTicketAlert';

// import { gs as gsstring } from 'utils/CRMString';
// import {
//   sagaConcurrentFetchAPI,
//   RAILS_STORAGE_UPLOAD_API,

//   SETTINGS_FETCH_OPTIONS_API,
//   SETTINGS_CREATE_MAIL_RECIPIENT_API,
//   SETTINGS_LINK_USER_TO_LEAD_API,
//   ZENDESK_DRAFT_TICKET_API,
//   ZENDESK_CREATE_TICKET_API,
//   ZENDESK_UPDATE_TICKET_API,

// } from "utils/Path";


// import { toggleAlert } from 'reducers/CRMSagas';
// // import {
// //   PAGE_NAME as CRM_PAGE_NAME, ACTION_TYPES as CRM_ACTION_TYPES,
// // } from 'reducers/CRMDefines';

// import { CRM_ACTIONS } from 'reducers/ActionType';
// import { ACTION_TYPES as CRM_ACTION_TYPES, ALERT_MESSAGE_TYPE } from 'reducers/CRMDefines';


// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

// //===== moment =====/
// // import moment from 'moment';
// import moment from 'moment-timezone';
// // import 'moment/locale/zh-cn';

// import intl from 'react-intl-universal'
// const locales = {
//   "en": require('locales/en.js'),
//   // "zh-TW": require('locales/zh-TW.js'),
//   // "zh-CN": require('./locales/zh-CN.js'),
// }



export function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export const isUndefined = (obj) => (typeof(obj) == 'undefined') ? true : false;
export const isDefined = (obj) => (typeof(obj) == 'undefined') ? false : true;
export const isValidValue = (obj) => (isUndefined(obj) || obj == null || obj == "" || (Array.isArray(obj) && obj.length == 0)) ? false : true;
export const objHasKey = (obj, key) => (isUndefined(obj) || obj == null) ? false : (obj.hasOwnProperty(key) ? true : false);
export const getObjByKey = (obj, key, val) => objHasKey(obj, key) ? obj[key] : (isUndefined(val) ? null : val);
export const concatStringWithComma = (str, val) => str += ((str != "") ? "," : "") + val;
export const selectArrayToString = (array) => {
  let label = "", value = []
  Object.keys(array).map((key) => {
    if(key != 'preventDefault'){
      label = concatStringWithComma(label, array[key].label)
      value.push(array[key].value)
    }
  })
  return {label, value}
}

export const getObjByKeys = (obj, keys, val) => {
  let currentObj = obj
  let realKeys = Array.isArray(keys) ? keys : [keys]
  for(let i = 0; i < realKeys.length; i++) {
    let key = realKeys[i]
    // if(!objHasKey(currentObj, key)) return val
    currentObj = getObjByKey(currentObj, key, val)
  }
  return currentObj
}

export function partOfObject(data, keys){
  let results = {}
  keys.map((key) => results[key] = data[key])
  return results
}

export const removeObjFromArray = (array, obj) => {
  var index = array.indexOf(obj)
  if (index > -1) array.splice(index, 1)
  return array
}

export const exchangeCurrency = (exchangeRates, srcCurrency, tarCurrency, amount) => {
  let rate = 1.0, decimal = 2, lcyAmount = amount || 0.0
  if(exchangeRates != undefined && srcCurrency != undefined && tarCurrency != undefined && amount != undefined) {
    const exchangeRate = getObjByKeys(exchangeRates, [srcCurrency, tarCurrency])
    if(exchangeRate != undefined) {
      rate = getObjByKeys(exchangeRate, ["rate"], 1.0)
      decimal = getObjByKeys(exchangeRate, ["tar_decimal_place"], 2)
      lcyAmount = (amount * rate).toFixed(decimal)
    }
  }
  return { rate, decimal, amount: lcyAmount }
}

// //http://momentjs.com/docs/#/displaying/format/
// export const userTimezone = () => {return moment.tz.guess()};

// export const DATE_FORMAT = "DD-MM-YYYY"
// export const TIME_FORMAT = "HH:mm:ss"
// export const DATE_TIME_FORMAT = DATE_FORMAT + " " + TIME_FORMAT

// export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD"
// export const DEFAULT_DATE_TIME_FORMAT = DEFAULT_DATE_FORMAT + " " + TIME_FORMAT

// export const DATE_MASK = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
// export const TIME_MASK = [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]
// export const DATE_TIME_MASK = [...DATE_MASK, ' ', ...TIME_MASK]

// export const formatedMomentToString = (value, format) => (value) ? moment(value).format(format) : "";//.tz("Asia/Singapore")
// export const formatedTimeToString = (value) => formatedMomentToString(value, TIME_FORMAT);
// export const formatedDateToString = (value) => formatedMomentToString(value, DATE_FORMAT);
// export const formatedDateTimeToString = (value) => formatedMomentToString(value, DATE_TIME_FORMAT);

// export const formatedStringToMoment = (str, format) => moment(str, format, true).toDate();//.tz("Asia/Singapore")
// export const formatedStringToTime = (str) => formatedStringToMoment(str, TIME_FORMAT);
// export const formatedStringToDate = (str) => formatedStringToMoment(str, DATE_FORMAT);
// export const formatedStringToDateTime = (str) => formatedStringToMoment(str, DATE_TIME_FORMAT);

// export const formatedNowToString = () => formatedDateTimeToString([]);
// export const getMomentDateString = (obj) => (obj) ? (obj._isAMomentObject ? obj.format("YYYY-MM-DD") : obj) : null;
// export const formatedMomentToEventString = (value) => formatedMomentToString(value, "YYYY-MM-DD HH:mm:ss");

// //years, months, weeks, days, hours, minutes, seconds
// export const momentDateDiffYear = (start, end, float) => momentDateDiff(start, end, "years", DATE_FORMAT, float)
// export const momentDateDiffMonth = (start, end, float) => momentDateDiff(start, end, "months", DATE_FORMAT, float)
// export const momentDateDiffDay = (start, end, float) => momentDateDiff(start, end, "days", DATE_FORMAT, float)
// export const momentDateDiff = (start, end, diff, format, float=0) => {
//   let c = 0
//   if(start && end) {
//     const a = (typeof start == "string") ? moment(start, format) : start
//     const b = (typeof end == "string") ? moment(end, format) : end
//     c = b.diff(a, diff, (float > 0))
//   }
//   return c.toFixed(float)
// }

// export const momentMax = (values) => moment.max(...momentArray(values))
// export const momentMin = (values) => moment.min(...momentArray(values))
// const momentArray = values => {
//   let array = []
//   values.map(v => {
//     let m = moment(v)
//     if(m.isValid()) array.push(m)
//   })
//   return array
// }

// export const isVaildMomentString = (str, format) => !(moment(str, format, true)._d == "Invalid Date");

// export const stringToInteger = (value) => {
//   let val = parseInt(value);
//   return isNaN(val) ? 0 : val
// }
// export const stringToFloat = (value) => {
//   let val = parseFloat(value);
//   return isNaN(val) ? 0 : val
// }
// export const floatToString = (f, n) => stringToFloat(f).toFixed(stringToInteger(n))
// export const floatToString = (f, n) => {
//   // console.log("-----")
//   // console.log(f)
//   // console.log(n)
//   // console.log(stringToFloat(f).toFixed(stringToInteger(n)))

//   let float = stringToFloat(f)
//   let scale = stringToInteger(n)

//   const split = f.toString().split(".")
//   let num = split[0], decimal = "", padding = num.length + scale + 1
//   if(split.length > 1) {
//     decimal = split[1]
//     if(decimal.length >= n) return float.toFixed(stringToInteger(n))
//     // else padding -= decimal.length
//   }
//   num += "." + decimal
//   num = num.padEnd(padding, '0')
//   // console.log(decimal + "|" + decimal.length + "," + padding)

//   // if(split.length > 1) decimal = split[1]
//   // num += "." + decimal

//   // console.log(decimal.padEnd(padding, '0'))
//   // console.log(decimal.length)
//   // console.log("-")
//   // console.log(padding)
//   // console.log(num)
//   // console.log(num.length)
//   return num
// }

// export const mergeArray = (arr1, arr2) => {
//   let array = arr1 || []
//   if(arr2) {
//     for(let i = 0; i < arr2.length; i++) {
//       let same = false
//       for(let j = 0; j < arr1.length; j++) {
//         if(getOptionValue(arr1[j]) == getOptionValue(arr2[i])){
//           same = true
//           break
//         }
//       }
//       if(!same) array.push(arr2[i])
//     }
//   }
//   return array
// }

// export const createDisabledField = (array, exception = []) => {
//   let disabledFields = {}
//   array.map((obj) => {
//     disabledFields[obj] = {disabled:true}
//     if (exception.includes(obj)){
//       disabledFields[obj] = {disabled:false}
//     }
//   })
//   return disabledFields
// }

// export const fieldMapping = (data, mappings) => {
//   let fields = {}
//   Object.keys(mappings).map((key) => {
//     const fieldKey = Array.isArray(mappings) ? mappings[key] : key
//     if(!isUndefined(data[mappings[key]])) fields[fieldKey] = data[mappings[key]]
//   })
//   return fields
// }

// //react select
// const get_option_field = (obj, field) => {
//   if(obj) {
//     if(objHasKey(obj, "_isAMomentObject") && obj._isAMomentObject);//ignore
//     else if(field && objHasKey(obj, field)) return obj[field]
//     else if(typeof obj  === "object"){
//       let item = {}
//       if(Array.isArray(obj))
//         item = obj.map((o) => get_option_field(o, field))
//       else
//         Object.keys(obj).map((key) => item[key] = get_option_field(obj[key], field))
//       return item
//     }
//   }
//   return obj
// }
// export const getOptionField = (array, field) => {
//   if(Array.isArray(array))
//     return array.map((obj) => get_option_field(obj, field))
//   else return get_option_field(array, field)
// }
// export const getOptionValue = (obj) => getOptionField(obj, "value")

// //status checking
// export const realDisabledControl = ({ disabled, storeDisabled }) => {
//   let realDisabled = false;

//   //disabled
//   if(!isUndefined(disabled)) realDisabled = disabled;
//   else if (!isUndefined(storeDisabled)) realDisabled = storeDisabled;
  
//   return realDisabled
// }

// export const realOptionsControl = ({ options, storeOptions }) => {
//   let realOptions = [];

//   //options
//   if(options && options.length != 0) realOptions = options
//   else if(storeOptions && storeOptions.length != 0) realOptions = storeOptions

//   return realOptions
// }

// export const createUrlParameters = (params, data) => {
//   let attrs = ""
//   Object.keys(params).map((key) => {
//     let name = getObjByKey(params, key, key)
//     if(data[key] && data[key] != "" && data[key] != []){
//       attrs += ((attrs == "") ? "?" : "&") + name + "=" + getOptionValue(data[key]).toString()
//     }
//   })
//   return attrs
// }

// export function checkInitStateForUpdate(currProps, nextProps, key){
//   return (currProps["initialValues"][key] != nextProps["initialValues"][key])
// }

// //========== local/remote data ==========//
// export function setSelectChangeConfigs(selectChangeMapping, country, payloads){
//   if(!Array.isArray(payloads)) payloads = [payloads]
//   let apiConfigs = [], fields = []
//   payloads.map((payload, idx) => {
//     const { fieldName, fieldValue, fieldOther } = payload
//     const mapping = getObjByKey(selectChangeMapping, fieldName, null)
//     if(mapping){
//       let items = mapping
//       if(!Array.isArray(mapping)) items = [mapping]
//       items.map((item, i) => {
//         let data = {type: item["sub_type"], [item["type"]]: fieldValue, country}
//         if(item["sub_attrs"]) data = Object.assign(data, item["sub_attrs"])

//         if(fieldOther && objHasKey(item, "values")){
//           const values = item["values"]
//           Object.keys(values).map((key) => {
//             data[key] = getObjByKey(fieldOther, values[key], null)
//           })
//         }
//         // else data[item["type"]] = fieldValue
//         // else if(fieldOther && objHasKey(item, "sub_value")){
//         //     //use data from other field (such as subcomponet etc.)
//         //     data[item["type"]] = getObjByKey(fieldOther, item["sub_value"], fieldValue)
//         // }

//         //set up
//         apiConfigs.push({ method: "post", url: SETTINGS_FETCH_OPTIONS_API, data: data})
//         fields.push({ local: item["sub_name"], remote: item["sub_type"], dataIdx: fields.length})
//       })
//     }
//   })
//   return { apiConfigs, fields }
// }

// export function mapRemoteToLocalFields(data, fields){
//   let results = {}
//   if(!Array.isArray(data)) data = [data]
//   fields.map((field, index) => {
//     if(objHasKey(field, "local") && objHasKey(field, "dataIdx") && objHasKey(field, "remote")) {
//       results[field.local] = data[field.dataIdx][field.remote]
//     }
//   })
//   return results;
// }

// export function* clearTaskInput(taskName, fields, value){
//   if(!Array.isArray(fields)) return;
//   for(let i = 0; i < fields.length; i++) {
//     yield put(change(taskName, (objHasKey(fields[i], "local") ? fields[i]["local"] : fields[i]), value || null))
//   }
// }

// // export function handleUtc(data, targets){
// //   let results = {}
// //   targets.map(target => {
// //     if(objHasKey(data, target)) results[target] = getMomentDateString(data[target])
// //   })
// //   return results
// // }

// export function setSavingPayloadData(data, fields){
//   let results = {}
//   fields.map((name) => { results[name] = getOptionValue(data[name]) })
//   return results
// }

// export function* putChangeForm(taskName, data){
//   if(data) {
//     const keys = Object.keys(data)
//     for(let i = 0; i < keys.length; i++)
//       yield put(change(taskName, keys[i], data[keys[i]]))
//   }
// }

// export const getReduxFormValues = taskName => state => getFormValues(taskName)(state)

// // export const mappingLoadOption = (mappings) => {
// //   let options = []
// //   Object.keys(mappings).map(key => {
// //     const opt = getObjByKeys(mappings, [key, "options"], null)
// //     if(opt && options.indexOf(opt) == -1) options.push(opt)
// //   })
// //   return {options}
// // }

// // export function* mappingLoadData(pageName, initValues, options, mappings){
// //   const formValues = yield select(getReduxFormValues(pageName))
// //   let initialValues = Object.assign({}, formValues), fieldOptions = {}
// //   const { id } = initValues
// //   if(id !== undefined) initialValues = { id }

// //   Object.keys(mappings).map(comp => {
// //     const dataKey = mappings[comp]["key"]
// //     const dataOptions = mappings[comp]["options"]

// //     if(initValues != null && dataKey != undefined && initValues[dataKey] != undefined)
// //       initialValues[comp] = initValues[dataKey]
// //     if(options != null && dataOptions != undefined)
// //       fieldOptions[comp] = options[dataOptions]
// //   })

// //   return { initialValues, fieldOptions }
// // }

// export function* updateFieldOptions(pageName, url, payload) {
//   const { data, values } = payload
//   let fieldOptions = {}

//   if(data != undefined) {
//     const apiConfigs = [{method: "post", url, data}]
//     const resData = yield sagaConcurrentFetchAPI(apiConfigs)
//     fieldOptions = resData[0]
//   }

//   const formValues = yield select(getReduxFormValues(pageName))
//   const initialValues = nestedObjectAssign(formValues, values)

//   // console.log("---- updateFieldOptions")
//   // console.log(formValues)
//   // console.log(values)
//   // console.log(initialValues)

//   return { initialValues, fieldOptions }
// }

// // export const mappingSaveData = (data, mappings) => {
// //   let results = {}

// //   Object.keys(mappings).map(comp => {
// //     const dataKey = mappings[comp]["key"]
// //     let item = data[comp]
// //     if(typeof data[comp] === "object")
// //       item = getObjByKey(item, "value", item)
// //     results[dataKey] = item
// //   })

// //   return results
// // }

// export const getMultiOptionValues = (options) => {
//   let result = []
//   if(options != null && options != undefined){
//     Object.keys(options).map(key => {
//       const value = options[key]
//       if(typeof value != "function") result.push(value)
//     })
//   }
//   return result
// }

// export const flatOptionValue = (values, options=[], field="value") => {
//   let result = getObjByKeys(values, [...options, field])
//   if(result == null) result = getObjByKeys(values, options)
//   // console.log("-----!")
//   // console.log(result)
//   // if(Array.isArray(result)) {
//   //   console.log(result)
//   //   result = result.map(r => flatOptionValue(r))
//   // }
//   return result
// }

// export const flatDateTimeValue = (value, format=DEFAULT_DATE_TIME_FORMAT) => {
//   if(getObjByKey(value, "_isAMomentObject")){
//     const m = moment(value)
//     return m.isValid() ? m.tz(moment.tz.guess()).format(format) : null
//   }
//   else if(value && typeof value === 'object') {
//     const keys = Object.keys(value)
//     if (keys.length == 1 && keys[0] == "preventDefault") return null
//   }
//   return value
// }

// export const isOption = (item) => objHasKey(item, "label") && objHasKey(item, "value")

// export const flatSaveData = (data) => {
//   let results = {}

//   Object.keys(data).map(key => {
//     const value = data[key]

//     if(value != undefined && value != null && typeof value === 'object') {
//       // console.log("----- " + key)
//       // console.log(value)
//       if(getObjByKey(value, "_isAMomentObject")) //moment 
//         results[key] = flatDateTimeValue(value, "YYYY-MM-DD HH:mm:ss")// DATE_TIME_FORMAT
//       else if(isOption(value)) //options
//         results[key] = value["value"]
//       else if(Array.isArray(value)) {//array
//         if(value.length > 0 && isOption(value[0])) //is option array
//           results[key] = value.map(v => v["value"])
//         else results[key] = value
//       } else results[key] = flatSaveData(value)
//     } else results[key] = value
//   })
//   return results
// }

// export function assignSettingValues(state, payload, settingKeys) {
//   let results = Object.assign({}, state)

//   // console.log("==========")
//   // console.log(state)
//   // console.log(payload)

//   if(payload) {
//     settingKeys.map(settingKey => {
//       let panels = results[settingKey]
//       const assignedPanels = payload[settingKey]

//       // console.log("1----- " + settingKey + " -----")
//       // console.log(panels)
//       // console.log(assignedPanels)

//       if(assignedPanels != undefined) {
//         if(panels == {}){
//           results = Object.assign(results, {[settingKey]:assignedPanels})
//         } else {// if(panels != undefined)
//           const panelKeys = Object.keys(assignedPanels)
//           panelKeys.map(panelKey => {
//             let componets = panels[panelKey], assingedComps = assignedPanels[panelKey], b = true

//             // console.log("2----- " + panelKey)
//             // console.log(componets)
//             // console.log(assingedComps)

//             if(componets == undefined){
//               panels = Object.assign({}, panels, {[panelKey]:assingedComps})
//             } else if(assingedComps && typeof assingedComps === 'object'){
//               b = (Object.keys(assingedComps).length > 0)
//               Object.keys(assingedComps).map(compKey => {
//                 const compValue = assingedComps[compKey]
//                 // console.log("3----- " + compKey)
//                 // console.log(compValue)
//                 componets = Object.assign({}, componets || {}, {[compKey]:compValue})
//               })
//               if(b) panels = Object.assign({}, panels, {[panelKey]:componets})
//             }

//             // console.log("----- panels")
//             // console.log(panels)

//           })//end panel
//           results = Object.assign(results, {[settingKey]:panels})
//         }
//       }
//     })
//   }

//   return Object.assign({}, state, results)
// }

// export function nestedObjectAssign(source, target){
//   let results = Object.assign({}, source)

//   // console.log("----- nestedObjectAssign")
//   // console.log(source)
//   // console.log(target)

//   // console.log("---- X1")
//   // console.log(results)

//   //source do not has key
//   if(target != undefined) {
//     Object.keys(target).map(key => {
//       const item = getObjByKeys(source, key), newItem = getObjByKeys(target, key)
//       if(item == undefined || item == {}) results = Object.assign({}, results, {[key]: newItem})
//     })
//   }

//   // console.log("---- X2")
//   // console.log(results)

//   //source has key
//   if(source != undefined) {
//     Object.keys(source).map(key => {
//       const item = getObjByKeys(source, key), newItem = objHasKey(target, key) ? target[key] : undefined
//       if(newItem !== undefined) {
//         const needNested = (newItem != null && typeof newItem === 'object' && !getObjByKey(newItem, "_isAMomentObject") && !isOption(newItem) && !Array.isArray(newItem))
//         results = Object.assign({}, results, {[key]: (needNested ? nestedObjectAssign(item, newItem) : newItem)})
//       }
//     })
//   } else return target
//   // if(source == undefined) console.log("[Error] source should not be null.")

//   // console.log("---- X3")
//   // console.log(results)

//   return results
// }

// //========== action types ==========//
// export function createActionTypes(page, items){
//   let list = {}
//   items.map(item => {list[item] = page + "_" + item})
//   return list
// }

// export function* actionStart(type, name, act="loading", data){
//   const { payload } = data

//   const open = (data.open == undefined) ? true : data.open
//   const confirm = (data.confirm == undefined) ? false : data.confirm
//   const title = (data.title == undefined) ? gs("pages." + name) : data.title
//   const message = (data.message == undefined) ? gs("system.start", {action: gs("actions." + act), title: title.toLowerCase()}) : data.message

//   yield put({ type, payload })
//   yield put({
//     type: CRM_ACTION_TYPES.FORM_SUBMITTING_START,
//     submitMsg: {
//       open, title, message,
//     },
//   })
// }

// export function* actionSuccess(type, name, act="loading", data){
//   const { payload } = data
//   // const formValues = yield select(getReduxFormValues("LeadPage"))

//   const open = (data.open == undefined) ? true : data.open
//   const alertType = (data.type == undefined) ? ALERT_MESSAGE_TYPE.OK : data.type
//   const action = gs("actions." + act)
//   const title = (data.title == undefined) ? gs("pages." + name) : data.title
//   const message = (data.message == undefined) ? gs("system.success", {action, title: title.toLowerCase()}) : data.message

//   let submitMsg = {
//     open, title, message, type: alertType,
//   }

//   switch(alertType){
//     case ALERT_MESSAGE_TYPE.YES_NO:
//     case ALERT_MESSAGE_TYPE.TEXT_FIELD:
//       const { yesText, noText, yesAction, noAction, rows } = data
//       submitMsg = Object.assign(submitMsg, {yesText, noText, yesAction, noAction, rows})
//       break
//     case ALERT_MESSAGE_TYPE.OK:
//       const { okAction } = data
//       submitMsg = Object.assign(submitMsg, {okAction})
//       break
//   }

//   yield put({ type, payload })
//   yield put({
//     type: CRM_ACTION_TYPES.FORM_SUBMITTING_SUCCESS,
//     submitMsg,
//   })
// }

// export function* actionFailure(type, name, act="loading", data){
//   const { error, payload } = data
//   const title = (data.title == undefined) ? gs("pages." + name) : data.title
//   const message = (data.message == undefined) ? error["message"] || error : data.message

//   if (error || message) {
//     console.log("--- " + act + " error")
//     if(error) console.log(error)
//     if(message) console.log(message)
//   }
  
//   yield put({ type, error, payload })
//   yield put({
//     type: CRM_ACTION_TYPES.FORM_SUBMITTING_FAILURE,
//     submitMsg: {
//       title: gs("system.failure", {action: gs("system." + act), title}),
//       message,
//     },
//   })
// }

// //========== active step key ==========//
// export const mappingActiveStep = (status, activeStepKey) =>{
//   // console.log("activeStepKey "+activeStepKey);
//   let keys = Object.keys(status);
//   let minKey = keys.filter( val => val <= activeStepKey);
//   if ( minKey.length == 0 ){
//     // console.log("ret "+keys[0]);
//     return keys[0];
//   }else{
//     // console.log("ret "+minKey[minKey.length-1]);
//     return minKey[minKey.length-1];
//   }
// }

// export function getFieldSetting(fieldSet, activeStep){
//   return fieldSet[mappingActiveStep(fieldSet,activeStep)];
// }

// export function* updateActiveStepKey(taskName, activeStepKey, fieldSet){
//   yield put(change(taskName, "task_status", activeStepKey))
//   return {
//     activeStepKey: activeStepKey,
//     fieldSettings: getFieldSetting(fieldSet, activeStepKey)
//   }
// }

// //========== open window ==========//
// export function openNewTab(url){
//   const win = window.open(url, "_blank");
//   if(win != null) win.focus();
//   else alert("Please allow browser pop-up.\n" + url);
// }

// //========== new mail recipient ==========//
// export function* openNewMailRecipientAlert(action){
//   const { actionType, taskName, payload } = action
//   const { fieldName, fieldValue } = payload
//   const formValues = Object.assign({}, yield select(getReduxFormValues(taskName)), {[NEW_MAIL_RECIPIENT_MAIL]: fieldValue})
//   yield put({ type: actionType.OPEN_NEW_MAIL_RECIPIENT_ALERT_SUCCESS, payload: formValues });
//   yield toggleAlert({ payload: { name: NEW_MAIL_RECIPIENT_ALERT, open: true }})//open
// }

// export function* newMailRecipientSubmit(action){
//   try {
//     const { actionType, taskName, country, lead_id, leadIdField, optionField, recipientFields, client_type } = action

//     yield put({
//       type: CRM_ACTIONS.FORM_SUBMITTING_START,
//       submitMsg:{
//         title: taskName,
//         message: gsstring("Save recipient", {type: taskName})
//       }
//     })

//     const formValues = yield select(getReduxFormValues(taskName))
//     let payloadData = {
//       name: formValues[NEW_MAIL_RECIPIENT_NAME],
//       email: formValues[NEW_MAIL_RECIPIENT_MAIL],
//       lead_id,
//     }
//     const apiConfigs = [
//       { method:"post", url: SETTINGS_CREATE_MAIL_RECIPIENT_API, data: payloadData },
//     ];
//     //client
//     const resData = yield sagaConcurrentFetchAPI(apiConfigs);

//     // options
//     const apiConfigs_opt = [
//       { method:"post", url: SETTINGS_FETCH_OPTIONS_API, data: {type: client_type, country, lead_id}},
//     ];
//     const resData_opt = yield sagaConcurrentFetchAPI(apiConfigs_opt);
//     const newRecipient = resData[0], newRecipients = resData_opt[0][client_type]

//     //update
//     let recipient_fields = {}
//     recipientFields.map((recipientField) => recipient_fields[recipientField] = newRecipient)

//     yield put({ type: actionType.NEW_MAIL_RECIPIENT_SUBMIT_SUCCESS, payload: {
//         initialValues: Object.assign(formValues, recipient_fields),
//         fieldOptions: {[optionField]: newRecipients},
//       }
//     });
//     yield toggleAlert({ payload: { name: NEW_MAIL_RECIPIENT_ALERT, open: false }})//close

//     yield put({
//       type: CRM_ACTIONS.FORM_SUBMITTING_SUCCESS,
//       submitMsg:{
//         title: taskName,
//         message: gsstring("Save recipient success", {type: taskName} ),
//       }
//     })
//   } catch (err) {
//     // dispatch a failure action to the store with the error
//     console.log("handleNewMailRecipientSubmit error: ");
//     console.log(err);
//     yield put({
//       type: CRM_ACTIONS.FORM_SUBMITTING_FAILURE,
//       submitMsg: {
//         title: gsstring("Save recipient fail", {type: taskName}),
//         message: err
//       }
//     })
//   }
// }

// export function* linkToLeadSubmit(action){
//   try {
//     const { type, payload, actionType, taskName, lead_id, user_id, ...other } = action

//     yield put({
//       type: CRM_ACTIONS.FORM_SUBMITTING_START,
//       submitMsg:{
//         title: taskName,
//         message: gsstring("Link to lead", {type: taskName})
//       }
//     })

//     // const formValues = yield select(getReduxFormValues(taskName))
//     const apiConfigs = [
//       { method:"post", url: SETTINGS_LINK_USER_TO_LEAD_API, data: {lead_id, user_id} },
//     ];

//     //client
//     const resData = yield sagaConcurrentFetchAPI(apiConfigs);
//     yield put({ type: actionType.LINK_TO_LEAD_SUCCESS, payload: {initValues: {lead_id, ...resData[0], ...other}} });
//     yield toggleAlert({ payload: { name: LINK_TO_LEAD_ALERT, open: false }})//close

//     yield put({
//       type: CRM_ACTIONS.FORM_SUBMITTING_SUCCESS,
//       submitMsg:{
//         title: taskName,
//         message: gsstring("Link to lead success", {type: taskName} ),
//       }
//     })
//   } catch (err) {
//     // dispatch a failure action to the store with the error
//     console.log("handleLinkToLeadSubmit error: ");
//     console.log(err);
//     yield put({
//       type: CRM_ACTIONS.FORM_SUBMITTING_FAILURE,
//       submitMsg: {
//         title: gsstring("Link to lead fail", {type: taskName}),
//         message: err
//       }
//     })
//   }
// }

// // export function* createNewMailRecipient(payload){
// //   const { task_name, country, lead_id, recipient_name, recipient_email, client_type } = payload
// //   let payloadData = {
// //     name: recipient_name,
// //     email: recipient_email,
// //     lead_id,
// //   }
// //   const apiConfigs = [
// //     { method:"post", url: SETTINGS_CREATE_MAIL_RECIPIENT_API, data: payloadData },
// //   ];
// //   //client
// //   const resData = yield sagaConcurrentFetchAPI(apiConfigs);

// //   // options
// //   const apiConfigs_opt = [
// //     { method:"post", url: SETTINGS_FETCH_OPTIONS_API, data: {type: client_type, country, lead_id}},
// //   ];
// //   const resData_opt = yield sagaConcurrentFetchAPI(apiConfigs_opt);

// //   return {
// //     initialValues: resData[0],
// //     fieldOption: resData_opt[0][client_type],
// //   }
// // }

// //========== fileUpload ==========//
// function createUpload(upload) {
//   const promise =  new Promise((resolve, reject) => {
//     upload.create((err, blob) => {
//       if (err) {
//         console.log("Upload error.")
//         reject(err)
//       } else resolve(blob)
//     });
//   });
//   return promise.then(res => ({ res })).catch(error => ({ error }))
// }

// export function* uploadFiles(files){
//   let results = []
//   try {
//     for (let i = 0; i < files.length; i++) {
//       const upload = new DirectUpload(files[i], RAILS_STORAGE_UPLOAD_API, this)
//       // const upload = new DirectUpload(files[i], "/api/investment_buildings/upload_documents", this)
//       let fileBlob = yield createUpload(upload)
//       // if(fileBlob['res']) results.push(fileBlob['res']["signed_id"])
//       if(fileBlob['res']) results = Object.assign({}, fileBlob['res'])
//       else console.log(fileBlob)
//     }
//   } catch (err) {
//     throw err;
//   }
//   return results
// }

// //========== send support ticket ==========//
// export function* sendSupportTicket(action){
//   const { payload, ...other } = action
//   const { data } = payload;

//   console.log(data)

//   let payloadData = setSavingPayloadData(data, [
//     ...SUPPORT_TICKET_ALERT_SETTINGS.fieldName,
//   ])
//   payloadData = Object.assign({}, payloadData, other)

//   const apiConfigs = [
//     { method:"post", url:ZENDESK_CREATE_TICKET_API, data: payloadData }
//   ];
//   const resData = yield sagaConcurrentFetchAPI(apiConfigs);

//   return resData[0]
// }

// export function* draftSupportTicket(action){

//   let newPayload = Object.assign({}, action)
//   delete newPayload.checklistSheet
//   console.log(newPayload)

//   const apiConfigs = [
//     { method:"post", url:ZENDESK_DRAFT_TICKET_API, data: newPayload }
//   ];
//   const resData = yield sagaConcurrentFetchAPI(apiConfigs);

//   return resData[0]
// }


// export function* updateSupportTicket(action){

//   let newPayload = Object.assign({}, action)
//   delete newPayload.checklistSheet
//   console.log(newPayload)

//   const apiConfigs = [
//     { method:"post", url:ZENDESK_UPDATE_TICKET_API, data: newPayload }
//   ];
//   const resData = yield sagaConcurrentFetchAPI(apiConfigs);

//   return resData[0]
// }

// //========== rich text editor =========//
// export function quillDeltaToHtml(ref) {
//   if(ref == undefined) return null
//   const { ops } = ref.getEditor().getContents()
//   const converter = new QuillDeltaToHtmlConverter(ops, {paragraphTag: "span"})
//   const html = converter.convert()
//   return html
// }

// //========== locale =========//
// export function gs(key, data){
//   let str = intl.get('default.' + key, data)
//   if(str != undefined && str != null) str = str.trim()
//   return (str != undefined && str != null) ? str.trim() : "[" + key.trim() + "]"
// }

// export function* initLocale(locale){
//   yield intl.init({currentLocale: locale, locales, fallbackLocale: "en"})

//   //moment (TO BE CHECKED)
//   moment.locale(locale)
// }

//========== other =========//
export const isDebugMode = (payload) => {
  return window.location.hostname == "localhost" || payload["debug"] || false
  //getObjByKey(payload, "debug", false)
}

// //https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
// export function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}


// export const getScreenWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
// export const getScreenHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

export function isPresent(variable){
  if(variable){
    switch(typeof(variable)){
      case 'object':
      {
        return(Object.keys(variable).length>0)
      }
      case 'array':
      {
        return variable.length > 0
      }
      default:
      {
        return true
      }
    }
  }
  else{
    return false
  }
}

