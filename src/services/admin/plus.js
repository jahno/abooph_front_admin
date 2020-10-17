import React from 'react';

import {notification, Button} from 'antd';

import * as constants from 'constants/plus';
import {options} from 'lang/plus/config/options';


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(constants.OTHERS.ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(constants.OTHERS.ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            
            if(!response.ok) {
                return Promise.reject(json);
            }

            return json;
        })
    );
};

export function exeRequest(absoluteUrl, method, data, callBack, callBackError, context){

    let options = {
        url:absoluteUrl,
        method: method
    }

    if(data && data !== {}){
        options = Object.assign({}, {body : JSON.stringify(data)}, options);
    }

    request(options).then(response => {
      //console.log("Calling", response)
      if(callBack) callBack.call(context, response);

    }).catch(error => {
        //alert("OK MERCI ERROR")
        if(error.status === 401) {

            localStorage.removeItem(constants.OTHERS.ACCESS_TOKEN);

            const key = `user_session_ending`;
            const btn = (
              <Button type="primary" size="small" onClick={() => window.location.href = constants.APP_URL.CONNEXION}>
                Se Connecter
              </Button>
            );

            notification.error({
                message: 'MySanlam +',
                description: "Desolé ! Votre session a expiré, veuillez vous connecter à nouveau ...!!!",
                btn,
                duration : 0,
                key
            });

            /*notification.error({
                message: 'MySanlam +',
                description: "Desolé ! Votre session a expiré, veuillez vous connecter à nouveau ...!!!"
            });*/

            //localStorage.removeItem(constants.OTHERS.ACCESS_TOKEN)
            //window.location.href = constants.API_URL.CONNEXION
            //handleLogout('/login', 'error', 'Votre session a expiré, veuillez vous connecter à nouveau ...!!!', context);
            //this.props.handleLogout('/login', 'error', 'Votre session a expiré, veuillez vous connecter à nouveau ...!!!');
        }
        else if(error.status === 403) {
            notification.error({
                message: 'MySanlam +',
                description: "Desolé ! Vous n'êtes pas autorisés a effectuer cette operation ...!!!"
            });
        }else {

            notification.error({
                message: 'MySanlam +',
                description: error.message || "Desolé ! Une erreur reseau s'est produite . Veuillez ressayer ...!"
            });

             if(callBackError){
                callBackError.call(context, error)
             } 
             
        }

    });
}


export function HLocalStorage(key,val) {
    try {
        return val? JSON.parse(localStorage.getItem(key))[val]: JSON.parse(localStorage.getItem(key))
    }catch (e) {
        return  null
    }
}
export function goBack(context) {
    //context.props.history.goBack();
    window.history.back();
}

export function  setUpLanguage (i18n, lang){
    lang = lang ? lang : (localStorage.getItem("lang") ? localStorage.getItem("lang") : "fr");

    switch(lang.toLowerCase()){
        case options[1].value :
        lang = options[1].value;
        break;
        default:
        lang = options[0].value;
        break;
    }

    i18n.changeLanguage(lang);

}

export function scrollToX (x,context){
    let intervalId = setInterval(() => {
        //console.log("context",context)
        if (window.pageYOffset <= x) {
            console.log("clearInterval")
            clearInterval(context.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - 50);
        //console.log("window.pageYOffset helpers ===>[x="+x+",window.pageYOffset="+window.pageYOffset+"]",window.pageYOffset)
    }, 16.66);
    context.setState({ intervalId: intervalId });
}

export function getUrlVars(url){
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}





export function getEnergies(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.ENERGIES,"GET",null,sCallBack,eCallBack,context)
}
export function getMarques(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.MARQUES,"GET",null,sCallBack,eCallBack,context)
}
export function getModelsByMarqueId(context,marqueId,sCallBack,eCallBack){
    exeRequest(constants.API_URL.MARQUES+"/"+marqueId+"/modeles","GET",null,sCallBack,eCallBack,context)
}
export function getPuissance(){
    let puissanceFiscale=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
    return puissanceFiscale;
}
export function getPeriodes(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.PERIODES,"GET",null,sCallBack,eCallBack,context)
}
export function getGarantiesIpt_Ic(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.GARANTIES_IPT_IC,"GET",null,sCallBack,eCallBack,context)
}
export function getFranchises(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.FRANCHISES,"GET",null,sCallBack,eCallBack,context)
}
export function getPackages(context,data,sCallBack,eCallBack){
    exeRequest(constants.API_URL.GENERER_PACKAGE_OFFRE,"POST",data,sCallBack,eCallBack,context)
}
export function getPackage(context,data,id,sCallBack,eCallBack){
    exeRequest(constants.API_URL.GENERER_PACKAGE_OFFRE+id,"POST",data,sCallBack,eCallBack,context)
}
export function getAgences(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.AGENCES + '/enable',"GET",null,sCallBack,eCallBack,context)
}

export function getTypesPieces(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.TYPES_PIECES,"GET",null,sCallBack,eCallBack,context)
}

export function getListContratVL(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.LIST_CONTRAT_VOYAGE,"GET",null,sCallBack,eCallBack,context)
}

export function getListNombreDeJours(context,contrat_id,sCallBack,eCallBack){
    exeRequest(constants.API_URL.LIST_NB_JOUR_VOYAGE+contrat_id,"GET",null,sCallBack,eCallBack,context)
}

export function getListSituationFamilliale(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.LIST_SITUATION_FAMILIALE_VOYAGE,"GET",null,sCallBack,eCallBack,context)
}

export function getPrimeDevisVoyage(context,data,sCallBack,eCallBack){
    exeRequest(constants.API_URL.PRIME_DEVIS_VOYAGE,"POST",data,sCallBack,eCallBack,context)
}

export function getSouscriptionData (transactionId, bigData){

    let tempTableContrat, commonsInfos, listgaranties, extraPrimes = null;

    let {infoPaiement, infoAssure,infoOffre,entitiesId,contratNumeroPolice,contratId} = bigData;

    console.log("==================================== bigData",bigData)
    
    commonsInfos = {
        
        //========== informations relatives a l'assure ===============
        id: HLocalStorage('cartId'),
        panier: JSON.stringify(bigData),
        assureId: infoAssure.id,
        assureCode: infoAssure.code,
        assureNom: infoAssure.nom,
        assurePrenom: infoAssure.prenom,
        assureAutrePrenom: infoAssure.autreprenom,
        assureNumPiece: infoAssure.numpiece,
        assureAdresse: infoAssure.adresse,
        assureProfession: infoAssure.profession,
        assureTelephone: infoAssure.tel,
        assureEmail: infoAssure.email,
        assureTypePieceId:infoAssure.typepiece.id,

        //========== informations relatives au contrat ===============
        contratNumeroPolice: contratNumeroPolice?contratNumeroPolice:null,
        contratId: contratId?contratId:null,
        contratProduitId: infoPaiement.produitId,
        contratEntitiesId: entitiesId,
        //entitiesId?entitiesId:constants.IDS.DEFAULT_ENTITIES,
        //========== informations relatives au renouvelement du contrat  ===============
        contratpPackageId: infoOffre.package.item.id,
        contratpPrimeNette: infoOffre.package.primeNette,
        contratpPrimeTTC: infoOffre.package.primeTTC,
        contratpCanal: constants.CANAUX_SOUSCRIPTION.WEB
    }

    switch(infoPaiement.produitId){

        case constants.IDS.PRODUIT_ASSO :
            // =========== Recuperation des informations sur les produits ASSO OU VOYAGE =================================

            console.log("===================> DateDebut ",infoOffre.dateDebut)
            console.log("===================> DateDebut toDate ",infoOffre.dateDebut.toDate())
            console.log("===================> DateDebut toDate addDays ",infoOffre.dateDebut.toDate().addDays().toISOString())
            tempTableContrat = {
                id : null,
                errorMessage: null,
                //========== informations relatives au renouvelement du contrat  ===============
                //contratpCanal: constants.CANAUX_SOUSCRIPTION.MF,
                contratpDuree: constants.OTHERS.DEFAULT_SOUSCRIPTION_MONTH,
                contratpStartDate: infoOffre.dateDebut.toDate().addDays().toISOString(),
                contratpEndDate: infoOffre.dateDebut.toDate().addDays().addMonths(constants.OTHERS.DEFAULT_SOUSCRIPTION_MONTH).toISOString()

            }

            listgaranties = infoOffre.package.garanties;
            break;

        case constants.IDS.PRODUIT_VOYAGE :
            //case constants.IDS.PRODUIT_VOYAGE :
            // =========== Recuperation des informations sur les produits ASSO OU VOYAGE =================================

            let {infoVoyage} = bigData

            console.log("===================> DateDebut ",infoOffre.dateDebut);
            console.log("===================> DateDebut toDate ",infoOffre.dateDebut.toDate());
            console.log("===================> DateDebut toDate addDays ",infoOffre.dateDebut.toDate().addDays().toISOString());

            tempTableContrat = {
                id : null,
                errorMessage: null,
                //========== informations relatives au renouvelement du contrat  ===============
                //contratpCanal: constants.CANAUX_SOUSCRIPTION.MF,
                contratpDuree: infoVoyage.nbJour,
                contratpDureeJours : infoVoyage.nbJour,
                //infoOffre.periode.dureeJours,
                contratpStartDate: infoOffre.dateDebut.toDate().addDays().toISOString(),
                contratpEndDate: infoOffre.dateDebut.toDate().addDays().addDays(infoVoyage.nbJour).toISOString()

            }

            commonsInfos.voyageLieuNaissance = infoAssure.lieunaissance;
            commonsInfos.voyageDateNaissance = infoAssure.datenaissance;
            commonsInfos.voyageContratId = infoVoyage.contratVoyage.id;
            commonsInfos.voyageContrat = infoVoyage.contratVoyage.title;
            commonsInfos.voyageSituationFamilialId = infoVoyage.situationFamiliale.id;
            commonsInfos.voyageSituationFamilial = infoVoyage.situationFamiliale.title;
            commonsInfos.voyageGsm = infoAssure.tel;
            commonsInfos.voyageCin = "xxxx";
            commonsInfos.voyageZone = "";
            commonsInfos.voyageCodeAgence = "";

            //listgaranties = infoOffre.package.garanties;
            break;

        default :
            // =========== Recuperation des informations sur la souscription automobile =================================
            let {infoVehicule, infoCategorie, infoTransport, infoRetrait,responseCodeCoupon} = bigData

            tempTableContrat = {
                id : null,
                errorMessage: null,
                //========== informations relatives au contrat ===============
                contratpNbrePlace: infoVehicule.nbplace,
                contratpImmatriculation: infoVehicule.immat,
                contratMajoration: null,
                contratpValeurNeuve: infoVehicule.valneuve,
                contratpPuissancePoidsCylindre: infoVehicule.puissance,
                contratpModeleId: infoVehicule.modele.id,
                contratpMarqueId: infoVehicule.marque.id,
                contratpModele: infoVehicule.modele.title,
                contratpMarque: infoVehicule.marque.title,
                contratpCategorieId: infoCategorie.id,
                contratpTransportId: infoTransport.id,
                contratpEnergieId: infoVehicule.energie.id,
                contratpDateCirculation: infoVehicule.miseencirculation.toDate().toISOString(),
                contratpCarteGrise: infoVehicule.carteGrise?infoVehicule.carteGrise.split(",")[1]:null,
                contratpGps:infoVehicule.gps?1:0,

                //========== informations relatives au renouvelement du contrat ===============
                contratpStartDate: infoOffre.dateDebut.toDate().toISOString(),
                contratpEndDate: infoOffre.dateDebut.toDate().addMonths(infoOffre.periode.dureeMois).toISOString(),
                contratpDuree: infoOffre.periode.dureeMois,
                contratpPeriodeId: infoOffre.periode.id,
                contratpFranchise: (infoOffre.franchise.id === 0 ? null : infoOffre.franchise.value),
                contratpFranchiseId: (infoOffre.franchise.id === 0 ? null : infoOffre.franchise.id),
                contratpTaxePrime: 0,
                contratpReductionBNS: infoOffre.remisebns,
                contratpReductionCommerciale: infoOffre.reduction,
                contratpCapitalAssure: (infoOffre.package.item.id === constants.IDS.PACKAGES_PACK_CONFORT ? infoOffre.capital.primeNette : null),
                contratpCapitalAssureId: (infoOffre.package.item.id === constants.IDS.PACKAGES_PACK_CONFORT ? infoOffre.capital.id : null),
                contratpFondGarantie: null,
                contratpValeurVenale: infoVehicule.valvenale,
                contratpRetraitId : infoRetrait.lieuRetrait.id,
                contratpAvr: infoOffre.avr,
                contratpAcceQuit: null,
                contratpTaxeAcceQuit: null,
                contratpCouponId:responseCodeCoupon?responseCodeCoupon.id:null,
                contratpCouponCode:responseCodeCoupon?responseCodeCoupon.code:null
            }

            listgaranties = infoOffre.package.garanties;

            console.log("listgaranties before ==>>>>>>>>>", listgaranties)
            console.log("optionalGaranties ==>>>>>>>>>", infoOffre.package.optionalGaranties)

            let optionalGaranties =  infoOffre.package.optionalGaranties.filter(w=>w.typeId===constants.IDS.CAT_GARANTIE_TEMPLATE_IPT_IC || (w.typeId===constants.IDS.CAT_GARANTIE_TEMPLATE_ASSISTANCE && w.status ===1) || w.typeId === constants.IDS.CAT_GARANTIE_TEMPLATE_AVR);
            //Array.prototype.push.apply(listgaranties, optionalGaranties);
            listgaranties = listgaranties.concat(optionalGaranties);
            extraPrimes = infoOffre.package.extraPrimes;
            break;
    }

    console.log("listgaranties ==>>>>>>>>>", listgaranties);

    return {transactionId: transactionId, tempTableContrat : Object.assign(tempTableContrat, commonsInfos), tempTableGaranties : listgaranties, extraPrimes : extraPrimes};

}

/*
export function getSouscriptionData (transactionId, bigData){

    let tempTableContrat, commonsInfos, listgaranties, extraPrimes = null;

    let {infoPaiement, infoAssure,infoOffre,entitiesId,contratNumeroPolice,contratId} = bigData;

    console.log("==================================== bigData",bigData)

    commonsInfos = {

        //========== informations relatives a l'assure ===============
        assureId: infoAssure.id,
        assureCode: infoAssure.code,
        assureNom: infoAssure.nom,
        assurePrenom: infoAssure.prenom,
        assureAutrePrenom: infoAssure.autreprenom,
        assureNumPiece: infoAssure.numpiece,
        assureAdresse: infoAssure.adresse,
        assureProfession: infoAssure.profession,
        assureTelephone: infoAssure.tel,
        assureEmail: infoAssure.email,
        assureTypePieceId:infoAssure.typepiece.id,

        //========== informations relatives au contrat ===============
        contratNumeroPolice: contratNumeroPolice?contratNumeroPolice:null,
        contratId: contratId?contratId:null,
        contratProduitId: infoPaiement.produitId,
        contratEntitiesId:entitiesId?entitiesId:constants.IDS.DEFAULT_ENTITIES,

        //========== informations relatives au renouvelement du contrat  ===============
        contratpPackageId: infoOffre.package.item.id,
        contratpPrimeNette: infoOffre.package.primeNette,
        contratpPrimeTTC: infoOffre.package.primeTTC,
        contratpCanal: constants.CANAUX_SOUSCRIPTION.MF
    }

    switch(infoPaiement.produitId){

        case constants.IDS.PRODUIT_ASSO :
            // =========== Recuperation des informations sur les produits ASSO OU VOYAGE =================================

            console.log("===================> DateDebut ",infoOffre.dateDebut)
            console.log("===================> DateDebut toDate ",infoOffre.dateDebut.toDate())
            console.log("===================> DateDebut toDate addDays ",infoOffre.dateDebut.toDate().addDays().toISOString())
            tempTableContrat = {
                id : null,
                errorMessage: null,
                //========== informations relatives au renouvelement du contrat  ===============
                //contratpCanal: constants.CANAUX_SOUSCRIPTION.MF,
                contratpDuree: constants.OTHERS.DEFAULT_SOUSCRIPTION_MONTH,
                contratpStartDate: infoOffre.dateDebut.toDate().addDays().toISOString(),
                contratpEndDate: infoOffre.dateDebut.toDate().addDays().addMonths(constants.OTHERS.DEFAULT_SOUSCRIPTION_MONTH).toISOString()

            }

            listgaranties = infoOffre.package.garanties;
            break;

        case constants.IDS.PRODUIT_VOYAGE :
            //case constants.IDS.PRODUIT_VOYAGE :
            // =========== Recuperation des informations sur les produits ASSO OU VOYAGE =================================

            let {infoVoyage} = bigData

            console.log("===================> DateDebut ",infoOffre.dateDebut);
            console.log("===================> DateDebut toDate ",infoOffre.dateDebut.toDate());
            console.log("===================> DateDebut toDate addDays ",infoOffre.dateDebut.toDate().addDays().toISOString());

            tempTableContrat = {
                id : null,
                errorMessage: null,
                //========== informations relatives au renouvelement du contrat  ===============
                //contratpCanal: constants.CANAUX_SOUSCRIPTION.MF,
                contratpDuree: infoVoyage.nbJour,
                //infoOffre.periode.dureeJours,
                contratpStartDate: infoOffre.dateDebut.toDate().addDays().toISOString(),
                contratpEndDate: infoOffre.dateDebut.toDate().addDays().addDays(infoOffre.periode.dureeJours).toISOString()

            }

            commonsInfos.voyageLieuNaissance = infoAssure.lieunaissance;
            commonsInfos.voyageContratId = infoVoyage.contratVoyage.id;
            commonsInfos.voyageSituationFamilial = infoVoyage.situationFamiliale;
            commonsInfos.voyageGsm = infoAssure.tel;
            commonsInfos.voyageCin = "xxxx";
            commonsInfos.voyageZone = "";
            commonsInfos.voyageCodeAgence = "";

            //listgaranties = infoOffre.package.garanties;
            break;

        default :
            // =========== Recuperation des informations sur la souscription automobile =================================
            let {infoVehicule, infoCategorie, infoTransport, infoRetrait,responseCodeCoupon} = bigData

            tempTableContrat = {
                id : null,
                errorMessage: null,
                //========== informations relatives au contrat ===============
                contratpNbrePlace: infoVehicule.nbplace,
                contratpImmatriculation: infoVehicule.immat,
                contratMajoration: null,
                contratpValeurNeuve: infoVehicule.valneuve,
                contratpPuissancePoidsCylindre: infoVehicule.puissance,
                contratpModeleId: infoVehicule.modele.id,
                contratpMarqueId: infoVehicule.marque.id,
                contratpModele: infoVehicule.modele.title,
                contratpMarque: infoVehicule.marque.title,
                contratpCategorieId: infoCategorie.id,
                contratpTransportId: infoTransport.id,
                contratpEnergieId: infoVehicule.energie.id,
                contratpDateCirculation: infoVehicule.miseencirculation.toDate().toISOString(),

                //========== informations relatives au renouvelement du contrat ===============
                contratpStartDate: infoOffre.dateDebut.toISOString(),
                contratpEndDate: infoOffre.dateDebut.toDate().addMonths(infoOffre.periode.dureeMois).toISOString(),
                contratpDuree: infoOffre.periode.dureeMois,
                contratpPeriodeId: infoOffre.periode.id,
                contratpFranchise: (infoOffre.franchise.id === 0 ? null : infoOffre.franchise.value),
                contratpFranchiseId: (infoOffre.franchise.id === 0 ? null : infoOffre.franchise.id),
                contratpTaxePrime: 0,
                contratpReductionBNS: infoOffre.remisebns,
                contratpReductionCommerciale: infoOffre.reduction,
                contratpCapitalAssure: (infoOffre.package.item.id === constants.IDS.PACKAGES_PACK_CONFORT ? infoOffre.capital.primeNette : null),
                contratpCapitalAssureId: (infoOffre.package.item.id === constants.IDS.PACKAGES_PACK_CONFORT ? infoOffre.capital.item.id : null),
                contratpFondGarantie: null,
                contratpValeurVenale: infoVehicule.valvenale,
                contratpRetraitId : infoRetrait.lieuRetrait.id,
                contratpAvr: infoOffre.avr,
                contratpAcceQuit: null,
                contratpTaxeAcceQuit: null,
                contratpCouponId:responseCodeCoupon?responseCodeCoupon.id:null,
                contratpCouponCode:responseCodeCoupon?responseCodeCoupon.code:null
            }

            listgaranties = infoOffre.package.garanties;

            let optionalGaranties =  infoOffre.package.optionalGaranties.filter(w=>w.typeId===constants.IDS.CAT_GARANTIE_TEMPLATE_IPT_IC || w.typeId===constants.IDS.CAT_GARANTIE_TEMPLATE_ASSISTANCE || w.typeId === constants.IDS.CAT_GARANTIE_TEMPLATE_AVR);
            listgaranties.push.apply(listgaranties, optionalGaranties);
            extraPrimes = infoOffre.package.extraPrimes;

            break;
    }

    console.log("listgaranties ==>>>>>>>>>", listgaranties);

    return {transactionId: transactionId, tempTableContrat : Object.assign(tempTableContrat, commonsInfos), tempTableGaranties : listgaranties, extraPrimes : extraPrimes};

}
*/

export function getPaiementTransactionId(context, transactionId, bigData, sCallBack, eCallBack){
    let data = getSouscriptionData(transactionId, bigData);
    exeRequest(constants.API_URL.GENERATE_TRANSAC, "POST", data, sCallBack, eCallBack, context);
}

export function NotifyPaiementSuccessfully(context, data, sCallBack, eCallBack){
    exeRequest(constants.API_URL.CINET_PAY_NOTIFY, "POST", data, sCallBack, eCallBack, context);
}

export function getReduction(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.REDUCTIONS,"GET",null,sCallBack,eCallBack,context)
}

export function checkingEntitiesRedirect(context, data, sCallBack,eCallBack){
    exeRequest(constants.API_URL.CHECKING_ENTITIES_REDIRECT,"POST",data,sCallBack,eCallBack,context)
}

export function checkingCodePromo(context, data, sCallBack,eCallBack){
    exeRequest(constants.API_URL.CHECKING_CODE_PROMO,"POST",data,sCallBack,eCallBack,context)
}

export function getContratByIdOrNumPolice(context,id,sCallBack,eCallBack){
    exeRequest(constants.API_URL.CONTRATS+"byref?ref="+id,"GET",null,sCallBack,eCallBack,context)
}

export function getClientContrats(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.USER+"me/contrats","GET",null,sCallBack,eCallBack,context)
}
export function getAssureContrats(context,id,sCallBack,eCallBack){
    exeRequest(constants.API_URL.ASSURE+id+"/contrats","GET",null,sCallBack,eCallBack,context)
}
export function getContrats(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.CONTRATS,"GET",null,sCallBack,eCallBack,context)
}

export function getUserInfos(context,sCallBack,eCallBack){
    exeRequest(constants.API_URL.USER + "me","GET",null,sCallBack,eCallBack,context)
}

export function userSessionChecker(){
    return localStorage.getItem(constants.OTHERS.ACCESS_TOKEN) ? true : false;
}

export function userAuthorizationChecker(user, roles){

    let userRole = user && user.role;
    //Helpers.HLocalStorage(constants.WSO2_CONFIG.WSO2_RESPONSE, "role")
    if(!userRole) return false;

    return roles.includes(userRole);

}

export function handlerPanier(json){

}

