/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de cr�ation :  19/03/2026 10:42:15                      */
/*==============================================================*/


drop table if exists ADRESSE;

drop table if exists APPARTENIR;

drop table if exists AVIS;

drop table if exists BOOST;

drop table if exists BOUTIQUE;

drop table if exists CATHEGORIEPRODUIT;

drop table if exists CLIENT;

drop table if exists COMMANDE;

drop table if exists CONSTITUER;

drop table if exists DISCUSSION;

drop table if exists LIVRAISON;

drop table if exists LIVREUR;

drop table if exists MESSAGE;

drop table if exists PANIER;

drop table if exists PAYEMENT;

drop table if exists PRODUIT;

drop table if exists PROMO;

drop table if exists VENDEUR;

drop table if exists VISER;

/*==============================================================*/
/* Table : ADRESSE                                              */
/*==============================================================*/
create table ADRESSE
(
   CODEADRESSE          varchar(15) not null,
   IDCLIENT             varchar(15) not null,
   LIEUXADRESSE         varchar(50),
   CONTACTADRESSE       varchar(50),
   DESCRIPTION          varchar(200),
   NBADRESSE            int,
   primary key (CODEADRESSE)
);

/*==============================================================*/
/* Table : APPARTENIR                                           */
/*==============================================================*/
create table APPARTENIR
(
   IDPRODUIT            varchar(15) not null,
   IDCATHEGORIEPRODUIT  varchar(15) not null,
   NBPRODUIT            int,
   primary key (IDPRODUIT, IDCATHEGORIEPRODUIT)
);

/*==============================================================*/
/* Table : AVIS                                                 */
/*==============================================================*/
create table AVIS
(
   IDAVIS               varchar(15) not null,
   IDLIVRAISON          varchar(15) not null,
   IDCLIENT             varchar(15) not null,
   IDPRODUIT            varchar(15) not null,
   IDBOUTIQUE           varchar(15) not null,
   NOTEAVIS             int,
   COMMENTAIREAVIS      varchar(500),
   DATEPOSTEAVIS        date,
   primary key (IDAVIS)
);

/*==============================================================*/
/* Table : BOOST                                                */
/*==============================================================*/
create table BOOST
(
   IDBOOST              varchar(15) not null,
   IDPRODUIT            varchar(15) not null,
   DATEDBOOST           date,
   DATEFBOOST           date,
   MONTANTBOOST         int,
   primary key (IDBOOST)
);

/*==============================================================*/
/* Table : BOUTIQUE                                             */
/*==============================================================*/
create table BOUTIQUE
(
   IDBOUTIQUE           varchar(15) not null,
   IDVENDEUR            varchar(15) not null,
   NOMBOUTIQUE          varchar(50),
   DESCRIPTIONBOUTIQUE  varchar(500),
   ADRESSEBOUTIQUE      varchar(50),
   MENTIONVERIFIERBOUTIQUE bool,
   DATECREATIONBOUTIQUE date,
   primary key (IDBOUTIQUE)
);

/*==============================================================*/
/* Table : CATHEGORIEPRODUIT                                    */
/*==============================================================*/
create table CATHEGORIEPRODUIT
(
   IDCATHEGORIEPRODUIT  varchar(15) not null,
   NOMCATHEGORIEPRODUIT varchar(25),
   NBREPRODUITCATHEGORIEPRODUIT int,
   primary key (IDCATHEGORIEPRODUIT)
);

/*==============================================================*/
/* Table : CLIENT                                               */
/*==============================================================*/
create table CLIENT
(
   IDCLIENT             varchar(15) not null,
   NOMCLIENT            varchar(50),
   PRENOMCLIENT         varchar(50),
   EMAILCLIENT          varchar(50),
   PASSWORDCLIENT       varchar(25),
   TELEPHONECLIENT      varchar(50),
   DATE_HEUREINSCRIPTIONCLIENT date,
   DATEUPDATECLIENT     date,
   primary key (IDCLIENT)
);

/*==============================================================*/
/* Table : COMMANDE                                             */
/*==============================================================*/
create table COMMANDE
(
   CODECOMMANDE         int not null,
   IDLIVRAISON          varchar(15) not null,
   IDPANIER             varchar(25) not null,
   IDPAYEMENT           varchar(15) not null,
   DATECOMMANDE         date,
   MONTANTCOMMANDE      int,
   STATUSCOMMANDE       varchar(25),
   primary key (CODECOMMANDE)
);

/*==============================================================*/
/* Table : CONSTITUER                                           */
/*==============================================================*/
create table CONSTITUER
(
   IDPRODUIT            varchar(15) not null,
   IDPANIER             varchar(25) not null,
   DATEAJOUTP           date,
   NBPRODUITAJOUT       int,
   HEURAJOUTP           time,
   primary key (IDPRODUIT, IDPANIER)
);

/*==============================================================*/
/* Table : DISCUSSION                                           */
/*==============================================================*/
create table DISCUSSION
(
   IDDISCUSSION         varchar(15) not null,
   DATECREATIONDISCUSSION date,
   NOMBREPARTICIPANT    int,
   primary key (IDDISCUSSION)
);

/*==============================================================*/
/* Table : LIVRAISON                                            */
/*==============================================================*/
create table LIVRAISON
(
   IDLIVRAISON          varchar(15) not null,
   IDLIVREUR            varchar(15) not null,
   CODEADRESSE          varchar(15) not null,
   DATELIVRAISON        date,
   COMMISSIONLIVRAISON  int,
   primary key (IDLIVRAISON)
);

/*==============================================================*/
/* Table : LIVREUR                                              */
/*==============================================================*/
create table LIVREUR
(
   IDLIVREUR            varchar(15) not null,
   NOMPRENOMLIVREUR     varchar(100),
   EMAILLIVREUR         varchar(25),
   PASSWORDLIVREUR      varchar(15),
   ADRESSELIVREUR       varchar(25),
   TELEPHONELIVREUR     varchar(25),
   DESCRIPTIONLIVREUR   varchar(300),
   primary key (IDLIVREUR)
);

/*==============================================================*/
/* Table : MESSAGE                                              */
/*==============================================================*/
create table MESSAGE
(
   IDMESSAGE            varchar(25) not null,
   IDCLIENT             varchar(15) not null,
   IDVENDEUR            varchar(15) not null,
   IDDISCUSSION         varchar(15) not null,
   DATECREATIONMESSAGE  date,
   HEURECREATIONMESSAGE time,
   CONTENUSMESSAGE      varchar(500),
   primary key (IDMESSAGE)
);

/*==============================================================*/
/* Table : PANIER                                               */
/*==============================================================*/
create table PANIER
(
   IDPANIER             varchar(25) not null,
   IDCLIENT             varchar(15) not null,
   QUANTITEPRODUITPANIER int,
   primary key (IDPANIER)
);

/*==============================================================*/
/* Table : PAYEMENT                                             */
/*==============================================================*/
create table PAYEMENT
(
   IDPAYEMENT           varchar(15) not null,
   IDCLIENT             varchar(15) not null,
   TYPEPAYEMENT         varchar(50),
   METHODEPAYEMENT      varchar(25),
   DATEPAYEMENT         date,
   STATUSPAYEMENT       varchar(25),
   ETASPAYEMENT         varchar(25),
   primary key (IDPAYEMENT)
);

/*==============================================================*/
/* Table : PRODUIT                                              */
/*==============================================================*/
create table PRODUIT
(
   IDPRODUIT            varchar(15) not null,
   IDBOUTIQUE           varchar(15) not null,
   NOMPRODUIT           varchar(25),
   DESCRIPTIONPRODUIT   varchar(300),
   QUANTITEMINPRODUIT   int,
   QUANTITESTOCKPRODUIT int,
   PRIXPRODUIT          int,
   DATE_HEUREAJOUTPRODUIT date,
   primary key (IDPRODUIT)
);

/*==============================================================*/
/* Table : PROMO                                                */
/*==============================================================*/
create table PROMO
(
   IDPROMOT             varchar(15) not null,
   CODEPROMOT           varchar(10),
   DATEDPROMOT          date,
   DATEFPROMOT          date,
   primary key (IDPROMOT)
);

/*==============================================================*/
/* Table : VENDEUR                                              */
/*==============================================================*/
create table VENDEUR
(
   IDVENDEUR            varchar(15) not null,
   NOMVENDEUR           varchar(50),
   PRENOMVENDEUR        varchar(50),
   EMAILVENDEUR         varchar(50),
   PASSWORDVENDEUR      varchar(15),
   TELEPHONEVENDEUR     varchar(50),
   MENTIONVERIFIERVENDEUR bool,
   DATE_HEURINSCRIPTIONVENDEUR date,
   DATE_HEUREUPDATEVENDEUR date,
   primary key (IDVENDEUR)
);

/*==============================================================*/
/* Table : VISER                                                */
/*==============================================================*/
create table VISER
(
   IDPRODUIT            varchar(15) not null,
   IDPROMOT             varchar(15) not null,
   NBPROMOT             int,
   primary key (IDPRODUIT, IDPROMOT)
);

alter table ADRESSE add constraint FK_DETENIR foreign key (IDCLIENT)
      references CLIENT (IDCLIENT) on delete restrict on update restrict;

alter table APPARTENIR add constraint FK_APPARTENIR foreign key (IDPRODUIT)
      references PRODUIT (IDPRODUIT) on delete restrict on update restrict;

alter table APPARTENIR add constraint FK_APPARTENIR2 foreign key (IDCATHEGORIEPRODUIT)
      references CATHEGORIEPRODUIT (IDCATHEGORIEPRODUIT) on delete restrict on update restrict;

alter table AVIS add constraint FK_DISPOSER foreign key (IDPRODUIT)
      references PRODUIT (IDPRODUIT) on delete restrict on update restrict;

alter table AVIS add constraint FK_DONNER foreign key (IDCLIENT)
      references CLIENT (IDCLIENT) on delete restrict on update restrict;

alter table AVIS add constraint FK_INCLURE foreign key (IDLIVRAISON)
      references LIVRAISON (IDLIVRAISON) on delete restrict on update restrict;

alter table AVIS add constraint FK_RECOLTER foreign key (IDBOUTIQUE)
      references BOUTIQUE (IDBOUTIQUE) on delete restrict on update restrict;

alter table BOOST add constraint FK_ASSOCIER foreign key (IDPRODUIT)
      references PRODUIT (IDPRODUIT) on delete restrict on update restrict;

alter table BOUTIQUE add constraint FK_AVOIR foreign key (IDVENDEUR)
      references VENDEUR (IDVENDEUR) on delete restrict on update restrict;

alter table COMMANDE add constraint FK_CONCERNER foreign key (IDPANIER)
      references PANIER (IDPANIER) on delete restrict on update restrict;

alter table COMMANDE add constraint FK_GENERER foreign key (IDLIVRAISON)
      references LIVRAISON (IDLIVRAISON) on delete restrict on update restrict;

alter table COMMANDE add constraint FK_VALIDER foreign key (IDPAYEMENT)
      references PAYEMENT (IDPAYEMENT) on delete restrict on update restrict;

alter table CONSTITUER add constraint FK_CONSTITUER foreign key (IDPRODUIT)
      references PRODUIT (IDPRODUIT) on delete restrict on update restrict;

alter table CONSTITUER add constraint FK_CONSTITUER2 foreign key (IDPANIER)
      references PANIER (IDPANIER) on delete restrict on update restrict;

alter table LIVRAISON add constraint FK_DESTINER foreign key (CODEADRESSE)
      references ADRESSE (CODEADRESSE) on delete restrict on update restrict;

alter table LIVRAISON add constraint FK_LIVRER foreign key (IDLIVREUR)
      references LIVREUR (IDLIVREUR) on delete restrict on update restrict;

alter table MESSAGE add constraint FK_ENVOYER foreign key (IDCLIENT)
      references CLIENT (IDCLIENT) on delete restrict on update restrict;

alter table MESSAGE add constraint FK_RECEVOIR foreign key (IDVENDEUR)
      references VENDEUR (IDVENDEUR) on delete restrict on update restrict;

alter table MESSAGE add constraint FK_RENFERMER foreign key (IDDISCUSSION)
      references DISCUSSION (IDDISCUSSION) on delete restrict on update restrict;

alter table PANIER add constraint FK_POSSEDER foreign key (IDCLIENT)
      references CLIENT (IDCLIENT) on delete restrict on update restrict;

alter table PAYEMENT add constraint FK_EFFECTUER foreign key (IDCLIENT)
      references CLIENT (IDCLIENT) on delete restrict on update restrict;

alter table PRODUIT add constraint FK_CONTENIR foreign key (IDBOUTIQUE)
      references BOUTIQUE (IDBOUTIQUE) on delete restrict on update restrict;

alter table VISER add constraint FK_VISER foreign key (IDPRODUIT)
      references PRODUIT (IDPRODUIT) on delete restrict on update restrict;

alter table VISER add constraint FK_VISER2 foreign key (IDPROMOT)
      references PROMO (IDPROMOT) on delete restrict on update restrict;

