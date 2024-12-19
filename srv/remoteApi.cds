// using {  API_BUSINESS_PARTNER as bupa} from './external/API_BUSINESS_PARTNER';
using { Suppliers } from '../db/remoteSchema';



service myBupa {
  // entity myBusinessPartner as projection on bupa.A_BusinessPartner;
  entity Foo as projection on Suppliers;
}