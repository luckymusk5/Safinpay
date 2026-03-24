<?xml version="1.0" encoding="UTF-8"?>
<?PowerDesigner AppLocale="UTF16" ID="{3D43EFD9-498C-479A-B3B1-F3A2A6D65D06}" Label="" LastModificationDate="1773913206" Name="DDCSafinpay" Objects="154" Symbols="45" Target="Java" TargetLink="Reference" Type="{18112060-1A4B-11D1-83D9-444553540000}" signature="CLD_OBJECT_MODEL" version="15.1.0.2850"?>
<!-- Veuillez ne pas modifier ce fichier -->

<Model xmlns:a="attribute" xmlns:c="collection" xmlns:o="object">

<o:RootObject Id="o1">
<c:Children>
<o:Model Id="o2">
<a:ObjectID>3D43EFD9-498C-479A-B3B1-F3A2A6D65D06</a:ObjectID>
<a:Name>DDCSafinpay</a:Name>
<a:Code>DDCSAFINPAY</a:Code>
<a:CreationDate>1773913189</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {07675B7F-3CFC-41D3-BD9D-0EFD73E98726}
DAT 1773913206</a:History>
<a:PackageOptionsText>[FolderOptions]

[FolderOptions\Class Diagram Objects]
GenerationCheckModel=Yes
GenerationPath=
GenerationOptions=
GenerationTasks=
GenerationTargets=
GenerationSelections=</a:PackageOptionsText>
<a:ModelOptionsText>[ModelOptions]

[ModelOptions\Cld]
CaseSensitive=Yes
DisplayName=Yes
EnableTrans=Yes
EnableRequirements=No
ShowClss=No
DeftAttr=int
DeftMthd=int
DeftParm=int
DeftCont=java.util.Collection
DomnDttp=Yes
DomnChck=No
DomnRule=No
SupportDelay=No
PreviewEditable=Yes
AutoRealize=No
DttpFullName=Yes
DeftClssAttrVisi=private
VBNetPreprocessingSymbols=
CSharpPreprocessingSymbols=

[ModelOptions\Cld\NamingOptionsTemplates]

[ModelOptions\Cld\ClssNamingOptions]

[ModelOptions\Cld\ClssNamingOptions\CLDPCKG]

[ModelOptions\Cld\ClssNamingOptions\CLDPCKG\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,,,firstLowerWord)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDPCKG\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDDOMN]

[ModelOptions\Cld\ClssNamingOptions\CLDDOMN\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDDOMN\Code]
Template=
MaxLen=254
Case=U
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDCLASS]

[ModelOptions\Cld\ClssNamingOptions\CLDCLASS\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,,,FirstUpperChar)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDCLASS\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDINTF]

[ModelOptions\Cld\ClssNamingOptions\CLDINTF\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,,,FirstUpperChar)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDINTF\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\UCDACTR]

[ModelOptions\Cld\ClssNamingOptions\UCDACTR\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\UCDACTR\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\UCDUCAS]

[ModelOptions\Cld\ClssNamingOptions\UCDUCAS\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\UCDUCAS\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\SQDOBJT]

[ModelOptions\Cld\ClssNamingOptions\SQDOBJT\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\SQDOBJT\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\SQDMSSG]

[ModelOptions\Cld\ClssNamingOptions\SQDMSSG\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\SQDMSSG\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CPDCOMP]

[ModelOptions\Cld\ClssNamingOptions\CPDCOMP\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,,,FirstUpperChar)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CPDCOMP\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDATTR]

[ModelOptions\Cld\ClssNamingOptions\CLDATTR\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,,,firstLowerWord)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDATTR\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDMETHOD]

[ModelOptions\Cld\ClssNamingOptions\CLDMETHOD\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,,,firstLowerWord)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDMETHOD\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDPARM]

[ModelOptions\Cld\ClssNamingOptions\CLDPARM\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,,,firstLowerWord)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDPARM\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\OOMPORT]

[ModelOptions\Cld\ClssNamingOptions\OOMPORT\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\OOMPORT\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\OOMPART]

[ModelOptions\Cld\ClssNamingOptions\OOMPART\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\OOMPART\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDASSC]

[ModelOptions\Cld\ClssNamingOptions\CLDASSC\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,,,firstLowerWord)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\CLDASSC\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\UCDASSC]

[ModelOptions\Cld\ClssNamingOptions\UCDASSC\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\UCDASSC\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\GNRLLINK]

[ModelOptions\Cld\ClssNamingOptions\GNRLLINK\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\GNRLLINK\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\RQLINK]

[ModelOptions\Cld\ClssNamingOptions\RQLINK\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\RQLINK\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\RLZSLINK]

[ModelOptions\Cld\ClssNamingOptions\RLZSLINK\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\RLZSLINK\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DEPDLINK]

[ModelOptions\Cld\ClssNamingOptions\DEPDLINK\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DEPDLINK\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\OOMACTV]

[ModelOptions\Cld\ClssNamingOptions\OOMACTV\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\OOMACTV\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\ACDOBST]

[ModelOptions\Cld\ClssNamingOptions\ACDOBST\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\ACDOBST\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\STAT]

[ModelOptions\Cld\ClssNamingOptions\STAT\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\STAT\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DPDNODE]

[ModelOptions\Cld\ClssNamingOptions\DPDNODE\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DPDNODE\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DPDCMPI]

[ModelOptions\Cld\ClssNamingOptions\DPDCMPI\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DPDCMPI\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DPDASSC]

[ModelOptions\Cld\ClssNamingOptions\DPDASSC\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DPDASSC\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\OOMVAR]

[ModelOptions\Cld\ClssNamingOptions\OOMVAR\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\OOMVAR\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\FILO]

[ModelOptions\Cld\ClssNamingOptions\FILO\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=&quot;\/:*?&lt;&gt;|&quot;
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\FILO\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_. &quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\FRMEOBJ]

[ModelOptions\Cld\ClssNamingOptions\FRMEOBJ\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\FRMEOBJ\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\FRMELNK]

[ModelOptions\Cld\ClssNamingOptions\FRMELNK\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\FRMELNK\Code]
Template=
MaxLen=254
Case=M
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DefaultClass]

[ModelOptions\Cld\ClssNamingOptions\DefaultClass\Name]
Template=
MaxLen=254
Case=M
ValidChar=
InvldChar=
AllValid=Yes
NoAccent=No
DefaultChar=_
Script=.convert_name(%Name%,&quot;_&quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Cld\ClssNamingOptions\DefaultClass\Code]
Template=
MaxLen=254
Case=U
ValidChar=&#39;a&#39;-&#39;z&#39;,&#39;A&#39;-&#39;Z&#39;,&#39;0&#39;-&#39;9&#39;,&quot;_&quot;
InvldChar=&quot; &#39;(.)+=*/&quot;
AllValid=Yes
NoAccent=Yes
DefaultChar=_
Script=.convert_code(%Code%,&quot; &quot;)
ConvTable=
ConvTablePath=%_HOME%\Fichiers de ressources\Tables de conversion

[ModelOptions\Generate]

[ModelOptions\Generate\Cdm]
CheckModel=Yes
SaveLinks=Yes
NameToCode=No
Notation=2

[ModelOptions\Generate\Pdm]
CheckModel=Yes
SaveLinks=Yes
ORMapping=No
NameToCode=No
BuildTrgr=No
TablePrefix=
RefrUpdRule=RESTRICT
RefrDelRule=RESTRICT
IndxPKName=%TABLE%_PK
IndxAKName=%TABLE%_AK
IndxFKName=%REFR%_FK
IndxThreshold=
ColnFKName=%.3:PARENT%_%COLUMN%
ColnFKNameUse=No

[ModelOptions\Generate\Xsm]
CheckModel=Yes
SaveLinks=Yes
ORMapping=No
NameToCode=No</a:ModelOptionsText>
<c:GenerationOrigins>
<o:Shortcut Id="o3">
<a:ObjectID>3F3C8A33-396C-4A12-95EC-94199BEDA0DF</a:ObjectID>
<a:Name>MCDSafinpay</a:Name>
<a:Code>MCDSAFINPAY</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:TargetStereotype/>
<a:TargetID>07675B7F-3CFC-41D3-BD9D-0EFD73E98726</a:TargetID>
<a:TargetClassID>1E597170-9350-11D1-AB3C-0020AF71E433</a:TargetClassID>
</o:Shortcut>
</c:GenerationOrigins>
<c:ObjectLanguage>
<o:Shortcut Id="o4">
<a:ObjectID>1077EF09-30E2-443D-A6B0-518389D16EF5</a:ObjectID>
<a:Name>Java</a:Name>
<a:Code>Java</a:Code>
<a:CreationDate>1773913189</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913189</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:TargetStereotype/>
<a:TargetID>0DEDDB90-46E2-45A0-886E-411709DA0DC9</a:TargetID>
<a:TargetClassID>1811206C-1A4B-11D1-83D9-444553540000</a:TargetClassID>
</o:Shortcut>
</c:ObjectLanguage>
<c:ExtendedModelDefinitions>
<o:Shortcut Id="o5">
<a:ObjectID>8ACB8172-4E1C-407C-AAF6-8DA48CD9D7EC</a:ObjectID>
<a:Name>WSDL for Java</a:Name>
<a:Code>WSDLJava</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:TargetStereotype/>
<a:TargetID>C8F5F7B2-CF9D-4E98-8301-959BB6E86C8A</a:TargetID>
<a:TargetClassID>186C8AC3-D3DC-11D3-881C-00508B03C75C</a:TargetClassID>
</o:Shortcut>
</c:ExtendedModelDefinitions>
<c:ClassDiagrams>
<o:ClassDiagram Id="o6">
<a:ObjectID>0DA78DB6-D2F4-4105-BBB3-670701AEB905</a:ObjectID>
<a:Name>Diagramme_1</a:Name>
<a:Code>DIAGRAMME_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {EAB48503-3772-431E-939F-E9DC0D0D032A}
DAT 1773913206</a:History>
<a:DisplayPreferences>[DisplayPreferences]

[DisplayPreferences\CLD]

[DisplayPreferences\General]
Adjust to text=Yes
Snap Grid=No
Constrain Labels=Yes
Display Grid=No
Show Page Delimiter=Yes
Grid size=0
Graphic unit=2
Window color=255, 255, 255
Background image=
Background mode=8
Watermark image=
Watermark mode=8
Show watermark on screen=No
Gradient mode=0
Gradient end color=255, 255, 255
Show Swimlane=No
SwimlaneVert=Yes
TreeVert=No
CompDark=0

[DisplayPreferences\Object]
Mode=0
Trunc Length=80
Word Length=80
Word Text=!&quot;&quot;#$%&amp;&#39;()*+,-./:;&lt;=&gt;?@[\]^_`{|}~
Shortcut IntIcon=Yes
Shortcut IntLoct=Yes
Shortcut IntFullPath=No
Shortcut IntLastPackage=Yes
Shortcut ExtIcon=Yes
Shortcut ExtLoct=No
Shortcut ExtFullPath=No
Shortcut ExtLastPackage=Yes
Shortcut ExtIncludeModl=Yes
EObjShowStrn=Yes
ExtendedObject.Comment=No
ExtendedObject.IconPicture=No
ExtendedObject_SymbolLayout=
ELnkShowStrn=Yes
ELnkShowName=Yes
ExtendedLink_SymbolLayout=
FileObject.Stereotype=No
FileObject.DisplayName=Yes
FileObject.LocationOrName=No
FileObject.IconPicture=No
FileObject.IconMode=Yes
FileObject_SymbolLayout=
PckgShowStrn=Yes
Package.Comment=No
Package.IconPicture=No
Package_SymbolLayout=
Display Model Version=Yes
Class.IconPicture=No
Class_SymbolLayout=
Interface.IconPicture=No
Interface_SymbolLayout=
Port.IconPicture=No
Port_SymbolLayout=
ClssShowSttr=Yes
Class.Comment=No
ClssShowCntr=Yes
ClssShowAttr=Yes
ClssAttrTrun=No
ClssAttrMax=3
ClssShowMthd=Yes
ClssMthdTrun=No
ClssMthdMax=3
ClssShowInnr=Yes
IntfShowSttr=Yes
Interface.Comment=No
IntfShowAttr=Yes
IntfAttrTrun=No
IntfAttrMax=3
IntfShowMthd=Yes
IntfMthdTrun=No
IntfMthdMax=3
IntfShowCntr=Yes
IntfShowInnr=Yes
PortShowName=Yes
PortShowType=No
PortShowMult=No
AttrShowVisi=Yes
AttrVisiFmt=1
AttrShowStrn=Yes
AttrShowDttp=Yes
AttrShowDomn=No
AttrShowInit=Yes
MthdShowVisi=Yes
MthdVisiFmt=1
MthdShowStrn=Yes
MthdShowRttp=Yes
MthdShowParm=Yes
AsscShowName=No
AsscShowCntr=Yes
AsscShowRole=Yes
AsscShowOrdr=Yes
AsscShowMult=Yes
AsscMultStr=Yes
AsscShowStrn=No
GnrlShowName=No
GnrlShowStrn=Yes
GnrlShowCntr=Yes
RlzsShowName=No
RlzsShowStrn=Yes
RlzsShowCntr=Yes
DepdShowName=No
DepdShowStrn=Yes
DepdShowCntr=Yes
RqlkShowName=No
RqlkShowStrn=Yes
RqlkShowCntr=Yes
PckgStrn=Yes
EnttAttr=Yes
PentMode=0
PentNb=5
EnttDttp=Yes
EnttDomn=Yes
EnttShowDomn=No
EnttMand=Yes
EnttCIdf=Yes
EnttKeyI=Yes
PentStrn=Yes
IdtfStrn=Yes
RlshName=Yes
RlshRole=Yes
RlshCard=No
RlshDmnt=Yes
RlshStrn=Yes
InhrName=Yes
InhrStrn=Yes
Entity.IconPicture=No
Entity_SymbolLayout=
Association.IconPicture=No
Association_SymbolLayout=
Inheritance.IconPicture=No
Inheritance_SymbolLayout=
EnttStrn=Yes
EnttCmmt=No
AsscStrn=Yes
AsscCmmt=No
AsscAttr=Yes
AsscDttp=Yes
AsscDomn=Yes
AsscShowDomn=No
AsscMand=Yes
AsscDLim=Yes
AsscNb=5
PassStrn=1
LinkRole=Yes
LinkCard=Yes
LinkStrn=Yes

[DisplayPreferences\Symbol]

[DisplayPreferences\Symbol\FRMEOBJ]
STRNFont=Arial,8,N
STRNFont color=0, 0, 0
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0, 0, 0
LABLFont=Arial,8,N
LABLFont color=0, 0, 0
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Width=6000
Height=2000
Brush color=255 255 255
Fill Color=Yes
Brush style=6
Brush bitmap mode=12
Brush gradient mode=64
Brush gradient color=192 192 192
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 255 128 128
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\FRMELNK]
CENTERFont=Arial,8,N
CENTERFont color=0, 0, 0
Line style=2
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Brush color=255 255 255
Fill Color=Yes
Brush style=1
Brush bitmap mode=12
Brush gradient mode=0
Brush gradient color=118 118 118
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 128 128 255
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\FILO]
OBJSTRNFont=Arial,8,N
OBJSTRNFont color=0, 0, 0
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0, 0, 0
LCNMFont=Arial,8,N
LCNMFont color=0, 0, 0
AutoAdjustToText=Yes
Keep aspect=Yes
Keep center=Yes
Keep size=No
Width=2400
Height=2400
Brush color=255 255 255
Fill Color=No
Brush style=1
Brush bitmap mode=12
Brush gradient mode=0
Brush gradient color=118 118 118
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 0 0 255
Shadow color=192 192 192
Shadow=-1

[DisplayPreferences\Symbol\CLDPCKG]
STRNFont=Arial,8,N
STRNFont color=0 0 0
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
LABLFont=Arial,8,N
LABLFont color=0 0 0
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Width=4800
Height=3600
Brush color=255 255 192
Fill Color=Yes
Brush style=6
Brush bitmap mode=12
Brush gradient mode=65
Brush gradient color=255 255 255
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 178 178 178
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\CLDCLASS]
STRNFont=Arial,8,N
STRNFont color=0 0 0
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
CNTRFont=Arial,8,N
CNTRFont color=0 0 0
AttributesFont=Arial,8,N
AttributesFont color=0 0 0
ClassPrimaryAttributeFont=Arial,8,U
ClassPrimaryAttributeFont color=0 0 0
OperationsFont=Arial,8,N
OperationsFont color=0 0 0
InnerClassifiersFont=Arial,8,N
InnerClassifiersFont color=0 0 0
LABLFont=Arial,8,N
LABLFont color=0 0 0
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Width=4800
Height=3600
Brush color=233 202 131
Fill Color=Yes
Brush style=6
Brush bitmap mode=12
Brush gradient mode=65
Brush gradient color=255 255 255
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 128 0 0
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\CLDINTF]
STRNFont=Arial,8,N
STRNFont color=0 0 0
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
CNTRFont=Arial,8,N
CNTRFont color=0 0 0
AttributesFont=Arial,8,N
AttributesFont color=0 0 0
OperationsFont=Arial,8,N
OperationsFont color=0 0 0
InnerClassifiersFont=Arial,8,N
InnerClassifiersFont color=0 0 0
LABLFont=Arial,8,N
LABLFont color=0 0 0
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Width=4800
Height=3600
Brush color=205 156 156
Fill Color=Yes
Brush style=6
Brush bitmap mode=12
Brush gradient mode=65
Brush gradient color=255 255 255
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 128 0 0
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\OOMPORT]
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
AutoAdjustToText=No
Keep aspect=No
Keep center=No
Keep size=No
Width=825
Height=800
Brush color=250 241 211
Fill Color=Yes
Brush style=6
Brush bitmap mode=12
Brush gradient mode=65
Brush gradient color=255 255 255
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 128 64 0
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\CLDASSC]
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
MULAFont=Arial,8,N
MULAFont color=0 0 0
Line style=2
Pen=1 0 128 0 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\INNERLINK]
Line style=2
Pen=1 0 128 0 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\CLDACLK]
Line style=2
Pen=2 0 128 0 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\GNRLLINK]
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
Line style=2
Pen=1 0 128 0 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\RLZSLINK]
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
Line style=2
Pen=3 0 128 0 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\RQLINK]
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
Line style=2
Pen=1 0 128 0 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\DEPDLINK]
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
Line style=2
Pen=2 0 128 0 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\USRDEPD]
OBJXSTRFont=Arial,8,N
OBJXSTRFont color=0 0 0
Line style=2
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Brush color=255 255 255
Fill Color=Yes
Brush style=1
Brush bitmap mode=12
Brush gradient mode=0
Brush gradient color=118 118 118
Brush background image=
Custom shape=
Custom text mode=0
Pen=2 0 128 0 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\Free Symbol]
Free TextFont=Arial,8,N
Free TextFont color=0 0 0
Line style=2
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Brush color=255 255 255
Fill Color=Yes
Brush style=1
Brush bitmap mode=12
Brush gradient mode=0
Brush gradient color=118 118 118
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 128 0 0
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\CDMPCKG]
STRNFont=Arial,8,N
STRNFont color=0 0 0
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
LABLFont=Arial,8,N
LABLFont color=0 0 0
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Width=4800
Height=3600
Brush color=255 255 192
Fill Color=Yes
Brush style=6
Brush bitmap mode=12
Brush gradient mode=65
Brush gradient color=255 255 255
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 178 178 178
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\ENTT]
STRNFont=Arial,8,N
STRNFont color=0 0 0
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
AttributesFont=Arial,8,N
AttributesFont color=0 0 0
LABLFont=Arial,8,N
LABLFont color=0 0 0
EntityPrimaryAttributeFont=Arial,8,U
EntityPrimaryAttributeFont color=0 0 0
IdentifiersFont=Arial,8,N
IdentifiersFont color=0 0 0
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Width=4800
Height=4000
Brush color=233 202 131
Fill Color=Yes
Brush style=6
Brush bitmap mode=12
Brush gradient mode=65
Brush gradient color=255 255 255
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 128 128 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\RLSH]
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
NAMAFont=Arial,8,N
NAMAFont color=0 0 0
Line style=2
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Brush color=255 255 255
Fill Color=Yes
Brush style=1
Brush bitmap mode=12
Brush gradient mode=0
Brush gradient color=118 118 118
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 128 0 64
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\ASSC]
STRNFont=Arial,8,N
STRNFont color=0, 0, 0
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0, 0, 0
AttributesFont=Arial,8,N
AttributesFont color=0, 0, 0
LABLFont=Arial,8,N
LABLFont color=0, 0, 0
AutoAdjustToText=Yes
Keep aspect=No
Keep center=No
Keep size=No
Width=4800
Height=3000
Brush color=208 208 255
Fill Color=Yes
Brush style=6
Brush bitmap mode=12
Brush gradient mode=65
Brush gradient color=255 255 255
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 128 128 255
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\LINK]
ROLEFont=Arial,8,N
ROLEFont color=0, 0, 0
CARDFont=Arial,8,N
CARDFont color=0, 0, 0
Line style=2
Pen=1 0 128 128 255
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\CDMINHR]
DISPNAMEFont=Arial,8,N
DISPNAMEFont color=0 0 0
AutoAdjustToText=No
Keep aspect=No
Keep center=No
Keep size=Yes
Width=1575
Height=1000
Brush color=233 202 131
Fill Color=Yes
Brush style=6
Brush bitmap mode=12
Brush gradient mode=65
Brush gradient color=255 255 255
Brush background image=
Custom shape=
Custom text mode=0
Pen=1 0 128 0 0
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\Symbol\LINH]
Line style=2
Pen=1 0 128 0 0
Shadow color=192 192 192
Shadow=0

[DisplayPreferences\CDM]</a:DisplayPreferences>
<a:PaperSize>(8268, 11693)</a:PaperSize>
<a:PageMargins>((315,354), (433,354))</a:PageMargins>
<a:PageOrientation>1</a:PageOrientation>
<a:PaperSource>15</a:PaperSource>
<c:Symbols>
<o:AssociationSymbol Id="o7">
<a:Rect>((-33661,-7994), (1041,12109))</a:Rect>
<a:ListOfPoints>((-33624,12109),(-33624,-6821),(1041,-6821))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o8"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o9"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o10"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o11">
<a:Rect>((-33766,-30640), (-21859,12259))</a:Rect>
<a:ListOfPoints>((-21859,-29467),(-33474,-29467),(-33474,12259))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o12"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o8"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o13"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o14">
<a:Rect>((-54934,-30490), (-21709,-12678))</a:Rect>
<a:ListOfPoints>((-54897,-12678),(-54897,-29317),(-21709,-29317))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>0</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o15"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o12"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o16"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationClassLinkSymbol Id="o17">
<a:CreationDate>1773913206</a:CreationDate>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Rect>((-54897,-29317), (-41468,-20005))</a:Rect>
<a:ListOfPoints>((-54897,-29317),(-54897,-20005),(-41468,-20005))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>0</a:ArrowStyle>
<a:LineColor>4194432</a:LineColor>
<a:DashStyle>2</a:DashStyle>
<a:ShadowColor>12632256</a:ShadowColor>
<c:SourceSymbol>
<o:AssociationSymbol Ref="o14"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o18"/>
</c:DestinationSymbol>
<c:Object>
<o:AssociationClassLink Ref="o19"/>
</c:Object>
</o:AssociationClassLinkSymbol>
<o:AssociationSymbol Id="o20">
<a:Rect>((-21709,-29317), (21958,-23318))</a:Rect>
<a:ListOfPoints>((20121,-23318),(20121,-29317),(-21709,-29317))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>0</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o21"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o12"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o22"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationClassLinkSymbol Id="o23">
<a:CreationDate>1773913206</a:CreationDate>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Rect>((-5466,-29317), (20121,-18133))</a:Rect>
<a:ListOfPoints>((20121,-29317),(20121,-18133),(-5466,-18133))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>0</a:ArrowStyle>
<a:LineColor>4194432</a:LineColor>
<a:DashStyle>2</a:DashStyle>
<a:ShadowColor>12632256</a:ShadowColor>
<c:SourceSymbol>
<o:AssociationSymbol Ref="o20"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o24"/>
</c:DestinationSymbol>
<c:Object>
<o:AssociationClassLink Ref="o25"/>
</c:Object>
</o:AssociationClassLinkSymbol>
<o:AssociationSymbol Id="o26">
<a:Rect>((20271,-23168), (48291,18384))</a:Rect>
<a:ListOfPoints>((20271,-23168),(46304,-23168),(46304,18384))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o21"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o27"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o28"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o29">
<a:Rect>((18434,-23018), (31542,-9599))</a:Rect>
<a:ListOfPoints>((31542,-9600),(20421,-9600),(20421,-23018))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o30"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o21"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o31"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o32">
<a:Rect>((29559,7048), (46304,18384))</a:Rect>
<a:ListOfPoints>((31396,7048),(31396,18384),(46304,18384))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o33"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o27"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o34"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o35">
<a:Rect>((43787,18384), (53994,38478))</a:Rect>
<a:ListOfPoints>((53994,38478),(46304,38478),(46304,18384))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o36"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o27"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o37"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationClassLinkSymbol Id="o38">
<a:CreationDate>1773913206</a:CreationDate>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Rect>((42643,30655), (46304,38478))</a:Rect>
<a:ListOfPoints>((46304,38478),(42643,38478),(42643,30655))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>0</a:ArrowStyle>
<a:LineColor>4194432</a:LineColor>
<a:DashStyle>2</a:DashStyle>
<a:ShadowColor>12632256</a:ShadowColor>
<c:SourceSymbol>
<o:AssociationSymbol Ref="o35"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o39"/>
</c:DestinationSymbol>
<c:Object>
<o:AssociationClassLink Ref="o40"/>
</c:Object>
</o:AssociationClassLinkSymbol>
<o:AssociationSymbol Id="o41">
<a:Rect>((29782,-9450), (33606,7198))</a:Rect>
<a:ListOfPoints>((31619,-9450),(31619,7198))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o30"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o33"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o42"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o43">
<a:Rect>((-46263,23559), (15533,30244))</a:Rect>
<a:ListOfPoints>((13696,30244),(13696,23559),(-46263,23559))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o44"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o45"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o46"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o47">
<a:Rect>((12009,30394), (54144,38628))</a:Rect>
<a:ListOfPoints>((13846,30394),(13846,38628),(54144,38628))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o44"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o36"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o48"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o49">
<a:Rect>((-20850,10274), (-1186,25870))</a:Rect>
<a:ListOfPoints>((-1223,10274),(-1223,24696),(-20850,24696))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o50"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o51"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o52"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o53">
<a:Rect>((-1110,-6821), (1078,10424))</a:Rect>
<a:ListOfPoints>((-1073,10424),(-1073,2944),(1041,2944),(1041,-6821))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o50"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o9"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o54"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o55">
<a:Rect>((-2760,10574), (46304,18384))</a:Rect>
<a:ListOfPoints>((-923,10574),(-923,18384),(46304,18384))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o50"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o27"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o56"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o57">
<a:Rect>((-57961,-30490), (-21709,-26197))</a:Rect>
<a:ListOfPoints>((-57961,-27372),(-40895,-27372),(-40895,-29317),(-21709,-29317))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o58"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o12"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o59"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o60">
<a:Rect>((-49732,-42406), (-21709,-29316))</a:Rect>
<a:ListOfPoints>((-47895,-42406),(-47895,-29317),(-21709,-29317))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>0</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o61"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o12"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o62"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationClassLinkSymbol Id="o63">
<a:CreationDate>1773913206</a:CreationDate>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Rect>((-47895,-40614), (-27185,-29317))</a:Rect>
<a:ListOfPoints>((-47895,-29317),(-47895,-40614),(-27185,-40614))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>0</a:ArrowStyle>
<a:LineColor>4194432</a:LineColor>
<a:DashStyle>2</a:DashStyle>
<a:ShadowColor>12632256</a:ShadowColor>
<c:SourceSymbol>
<o:AssociationSymbol Ref="o60"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o64"/>
</c:DestinationSymbol>
<c:Object>
<o:AssociationClassLink Ref="o65"/>
</c:Object>
</o:AssociationClassLinkSymbol>
<o:AssociationSymbol Id="o66">
<a:Rect>((9154,-34400), (48291,18384))</a:Rect>
<a:ListOfPoints>((9154,-34400),(46304,-34400),(46304,18384))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o67"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o27"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o68"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o69">
<a:Rect>((13959,-10623), (31692,30544))</a:Rect>
<a:ListOfPoints>((31692,-9450),(13996,-9450),(13996,30544))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o30"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o44"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o70"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o71">
<a:Rect>((7467,-34250), (15983,30544))</a:Rect>
<a:ListOfPoints>((9304,-34250),(9304,-1834),(13996,-1834),(13996,30544))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o67"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o44"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o72"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o73">
<a:Rect>((-21709,-34100), (9491,-28142))</a:Rect>
<a:ListOfPoints>((9454,-34100),(9454,-29317),(-21709,-29317))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o67"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o12"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o74"/>
</c:Object>
</o:AssociationSymbol>
<o:AssociationSymbol Id="o75">
<a:Rect>((-33511,-35123), (9604,12259))</a:Rect>
<a:ListOfPoints>((9604,-33950),(-33474,-33950),(-33474,12259))</a:ListOfPoints>
<a:CornerStyle>2</a:CornerStyle>
<a:ArrowStyle>2048</a:ArrowStyle>
<a:LineColor>16744576</a:LineColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>DISPNAME 0 Arial,8,N
MULA 0 Arial,8,N</a:FontList>
<c:SourceSymbol>
<o:ClassSymbol Ref="o67"/>
</c:SourceSymbol>
<c:DestinationSymbol>
<o:ClassSymbol Ref="o8"/>
</c:DestinationSymbol>
<c:Object>
<o:Association Ref="o76"/>
</c:Object>
</o:AssociationSymbol>
<o:ClassSymbol Id="o9">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-8679,-12627), (10761,-1015))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o77"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o44">
<a:IconMode>-1</a:IconMode>
<a:Rect>((5483,27360), (21909,33128))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o78"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o51">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-29488,21812), (-12212,27580))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o79"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o50">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-9823,6903), (7377,13645))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o80"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o30">
<a:IconMode>-1</a:IconMode>
<a:Rect>((23522,-12971), (39562,-6229))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o81"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o12">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-30729,-34299), (-12989,-24635))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o82"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o33">
<a:IconMode>-1</a:IconMode>
<a:Rect>((23530,2703), (39262,11393))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o83"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o67">
<a:IconMode>-1</a:IconMode>
<a:Rect>((825,-37771), (17483,-31029))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o84"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o8">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-42571,7277), (-24677,16941))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o85"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o58">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-64861,-30743), (-51061,-24001))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o86"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o15">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-64771,-15562), (-45023,-9794))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o87"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o21">
<a:IconMode>-1</a:IconMode>
<a:Rect>((11637,-25715), (28605,-20921))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o88"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o61">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-54718,-45777), (-41072,-39035))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o89"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o27">
<a:IconMode>-1</a:IconMode>
<a:Rect>((36777,13065), (55831,23703))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o90"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o45">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-54167,18727), (-38359,28391))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o91"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o36">
<a:IconMode>-1</a:IconMode>
<a:Rect>((46824,35107), (61164,41849))</a:Rect>
<a:LineColor>4227200</a:LineColor>
<a:FillColor>8637161</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o92"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o18">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-45239,-21915), (-37697,-18095))</a:Rect>
<a:LineColor>16744576</a:LineColor>
<a:FillColor>16765136</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o93"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o24">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-12173,-21017), (1241,-15249))</a:Rect>
<a:LineColor>16744576</a:LineColor>
<a:FillColor>16765136</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o94"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o39">
<a:IconMode>-1</a:IconMode>
<a:Rect>((38794,28745), (46492,32566))</a:Rect>
<a:AutoAdjustToText>0</a:AutoAdjustToText>
<a:LineColor>16744576</a:LineColor>
<a:FillColor>16765136</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o95"/>
</c:Object>
</o:ClassSymbol>
<o:ClassSymbol Id="o64">
<a:IconMode>-1</a:IconMode>
<a:Rect>((-30956,-42524), (-23414,-38704))</a:Rect>
<a:LineColor>16744576</a:LineColor>
<a:FillColor>16765136</a:FillColor>
<a:ShadowColor>12632256</a:ShadowColor>
<a:FontList>STRN 0 Arial,8,N
DISPNAME 0 Arial,8,N
CNTR 0 Arial,8,N
Attributes 0 Arial,8,N
ClassPrimaryAttribute 0 Arial,8,U
Operations 0 Arial,8,N
InnerClassifiers 0 Arial,8,N
LABL 0 Arial,8,N</a:FontList>
<a:BrushStyle>6</a:BrushStyle>
<a:GradientFillMode>65</a:GradientFillMode>
<a:GradientEndColor>16777215</a:GradientEndColor>
<c:Object>
<o:Class Ref="o96"/>
</c:Object>
</o:ClassSymbol>
</c:Symbols>
</o:ClassDiagram>
</c:ClassDiagrams>
<c:DefaultDiagram>
<o:ClassDiagram Ref="o6"/>
</c:DefaultDiagram>
<c:Classes>
<o:Class Id="o77">
<a:ObjectID>FA1ACFD3-CE68-40AC-911C-34DCD101599B</a:ObjectID>
<a:Name>Vendeur</a:Name>
<a:Code>Vendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {DE4BCEAA-34B5-4197-8BE5-EE87A2DD3BCA}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>VENDEUR</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o97">
<a:ObjectID>5E5ABCAA-CF78-4780-9589-11EC621930D2</a:ObjectID>
<a:Name>IdVendeur</a:Name>
<a:Code>idVendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {8942C6EA-81A8-4FAF-A2C4-09DC718176C5}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDVENDEUR</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o98">
<a:ObjectID>D2C4DE63-416D-490C-BBDD-5945CF683CDF</a:ObjectID>
<a:Name>NomVendeur</a:Name>
<a:Code>nomVendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {C9E5601C-A3B2-4F40-854F-72F1B5E25DE6}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>NOMVENDEUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o99">
<a:ObjectID>F7E65899-A688-4824-ABDC-1CA5FD301BB1</a:ObjectID>
<a:Name>PrenomVendeur</a:Name>
<a:Code>prenomVendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {6224DA42-4FD3-4358-8635-6C23D8209010}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>PRENOMVENDEUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o100">
<a:ObjectID>C9155871-52BE-4D30-8360-8DE6FA4FC535</a:ObjectID>
<a:Name>EmailVendeur</a:Name>
<a:Code>emailVendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {EFAC757F-A061-4F3B-9429-25BC9A7A4CCB}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>EMAILVENDEUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o101">
<a:ObjectID>506E82CA-EC93-4C4A-902C-8D4BAE18A025</a:ObjectID>
<a:Name>PasswordVendeur</a:Name>
<a:Code>passwordVendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {1D71DFFB-9595-4C8B-BC28-FE6DC7265CE0}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>PASSWORDVENDEUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o102">
<a:ObjectID>36F97920-2979-4C64-9A86-7C6742D2E1E4</a:ObjectID>
<a:Name>TelephoneVendeur</a:Name>
<a:Code>telephoneVendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {AF55B26F-A233-405B-9AB8-F2CFC5AF678D}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>TELEPHONEVENDEUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o103">
<a:ObjectID>EB7987BE-B1B2-440E-BC3D-5A3E63E85CE5</a:ObjectID>
<a:Name>MentionVerifierVendeur</a:Name>
<a:Code>mentionVerifierVendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {73FF14DF-AEF8-4463-81AF-A2BA1C362BEA}
DAT 1773913206</a:History>
<a:DataType>boolean</a:DataType>
<a:PersistentCode>MENTIONVERIFIERVENDEUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o104">
<a:ObjectID>E86E322D-67C3-4E76-81F2-3EF7B1BD1E3A</a:ObjectID>
<a:Name>Date&amp;HeurInscriptionVendeur</a:Name>
<a:Code>date&amp;HeurInscriptionVendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {AF43C503-606B-449F-996B-06FFE12DC31C}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATE_HEURINSCRIPTIONVENDEUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o105">
<a:ObjectID>2BFF97B5-B38F-4734-B3DD-2549D1825D50</a:ObjectID>
<a:Name>Date&amp;HeureUpdateVendeur</a:Name>
<a:Code>date&amp;HeureUpdateVendeur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {A242C174-27B9-41A5-AD1C-33D96F469815}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATE_HEUREUPDATEVENDEUR</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o106">
<a:ObjectID>44EDA50C-C310-496C-B9FA-294E8D842D64</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {46FC2A51-1617-4FCE-B7BE-B960324908B4}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o97"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o106"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o78">
<a:ObjectID>32BAAB4E-D451-44FE-BE84-C367136FC7F5</a:ObjectID>
<a:Name>Livraison</a:Name>
<a:Code>Livraison</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {470C430A-3E91-4571-98CD-5A9A4DD435A4}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>LIVRAISON</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o107">
<a:ObjectID>B47B76C3-A31E-4ED1-8F87-E8F155C72140</a:ObjectID>
<a:Name>IdLivraison</a:Name>
<a:Code>idLivraison</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {3FFB4FE0-327E-4E6D-A23F-631303E54222}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDLIVRAISON</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o108">
<a:ObjectID>552BEE5B-671F-460B-B22C-5AA736E13CDE</a:ObjectID>
<a:Name>DateLivraison</a:Name>
<a:Code>dateLivraison</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {6258602C-3116-4716-B8D5-A12A591BFB0D}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATELIVRAISON</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o109">
<a:ObjectID>67F1C5BF-BF2F-40BC-8B30-B4338B9904F4</a:ObjectID>
<a:Name>CommissionLivraison</a:Name>
<a:Code>commissionLivraison</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {218FEE34-A3DA-4365-8919-753F7D08C6AD}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>COMMISSIONLIVRAISON</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o110">
<a:ObjectID>42823196-5EFA-40FE-BD47-D8C191BCF3E8</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {C3FE7FEA-9467-486D-9DEF-CE213F96E72F}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o107"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o110"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o79">
<a:ObjectID>0B2A9E6E-A018-4C7E-8C4D-D3A87F75EA7F</a:ObjectID>
<a:Name>Discussion</a:Name>
<a:Code>Discussion</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {B2BB2231-0DAA-4953-B574-1A4701377C42}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>DISCUSSION</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o111">
<a:ObjectID>816A1ECE-AB2C-4F4C-82E2-748E2560E3A1</a:ObjectID>
<a:Name>IdDiscussion</a:Name>
<a:Code>idDiscussion</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {065E973F-7729-4BE5-A9A7-2F01D114E212}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDDISCUSSION</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o112">
<a:ObjectID>FA94BE2F-32B4-40E5-9E5C-975348F9255C</a:ObjectID>
<a:Name>DateCreationDiscussion</a:Name>
<a:Code>dateCreationDiscussion</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {F6BE6C35-47F1-445A-A7F2-2F905FF82AA4}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATECREATIONDISCUSSION</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o113">
<a:ObjectID>3D8BD82F-AB7E-40D9-AD19-399D315B6583</a:ObjectID>
<a:Name>NombreParticipant</a:Name>
<a:Code>nombreParticipant</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {5DD0CF29-8C5C-4FC7-B691-189B676A2C46}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>NOMBREPARTICIPANT</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o114">
<a:ObjectID>48F7615A-780F-407F-9B8E-2539C2F55437</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {385599A2-CE10-437A-A437-687A9EA9EA7E}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o111"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o114"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o80">
<a:ObjectID>F8FAA322-AE80-488C-A7F0-6660A308F3F8</a:ObjectID>
<a:Name>Message</a:Name>
<a:Code>Message</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {FE62EFFC-F578-4B08-9E32-3D5D76C0FB82}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>MESSAGE</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o115">
<a:ObjectID>A672F0FC-8999-4F10-A17A-F77F6C3667DC</a:ObjectID>
<a:Name>IdMessage</a:Name>
<a:Code>idMessage</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {CEBFF0BA-846E-409F-BD22-848769EC0632}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDMESSAGE</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o116">
<a:ObjectID>1F98564C-8465-4581-BB6F-55DAD3362E4B</a:ObjectID>
<a:Name>DateCreationMessage</a:Name>
<a:Code>dateCreationMessage</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {9CFF7A3C-99F0-46CE-8959-00CDBE85097C}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATECREATIONMESSAGE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o117">
<a:ObjectID>5980B125-D647-4D12-9908-261156CFA440</a:ObjectID>
<a:Name>HeureCreationMessage</a:Name>
<a:Code>heureCreationMessage</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {164A4736-7DED-4A74-9230-F5AC6937C4E1}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>HEURECREATIONMESSAGE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o118">
<a:ObjectID>E761045E-37D7-4DDA-AB93-728C37DC06ED</a:ObjectID>
<a:Name>ContenusMessage</a:Name>
<a:Code>contenusMessage</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {0214580A-449F-4E7C-9163-F26F99BAA6B8}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>CONTENUSMESSAGE</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o119">
<a:ObjectID>CF3B1B77-4B77-4CE7-9BE1-E3E3E7767985</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {BC991BC9-1F23-45FE-BAB9-3C361D0A9E7F}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o115"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o119"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o81">
<a:ObjectID>1D778410-B4AB-4278-A93D-E13E9FC66B66</a:ObjectID>
<a:Name>Commande</a:Name>
<a:Code>Commande</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {62A0F21F-CF7C-4B98-A158-6D0425397481}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>COMMANDE</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o120">
<a:ObjectID>EC983738-493C-4549-8006-47A00A7590C2</a:ObjectID>
<a:Name>CodeCommande</a:Name>
<a:Code>codeCommande</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {CB6F8870-1E61-4FB3-B5F8-35494A1CAA67}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>CODECOMMANDE</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o121">
<a:ObjectID>89EB3849-1BB2-4383-8A18-46121E763A45</a:ObjectID>
<a:Name>DateCommande</a:Name>
<a:Code>dateCommande</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {474F1994-E91A-4A2F-8ABD-E7C5B3D11C0C}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATECOMMANDE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o122">
<a:ObjectID>9D11DEC8-6861-46F8-9616-E484F5C81E06</a:ObjectID>
<a:Name>MontantCommande</a:Name>
<a:Code>montantCommande</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {5B4B6D06-2417-4131-BE7A-865C2D30DABE}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>MONTANTCOMMANDE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o123">
<a:ObjectID>B2BEEA6A-9E89-4087-847D-D04A2F57730C</a:ObjectID>
<a:Name>StatusCommande</a:Name>
<a:Code>statusCommande</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {F2D5E340-A834-4CB7-9ECC-90FCDD0B76CD}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>STATUSCOMMANDE</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o124">
<a:ObjectID>9BC610F4-1DEA-4CC1-8D5D-74708E58E4A7</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {22CC045E-E4BB-4AEE-9F8E-68EC36809C30}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o120"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o124"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o82">
<a:ObjectID>CF302028-2884-4482-9EE1-8D82CC8E6C90</a:ObjectID>
<a:Name>Produit</a:Name>
<a:Code>Produit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {9BAAC5AA-E31F-47BE-AC0F-989AC9DDB91D}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>PRODUIT</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o125">
<a:ObjectID>51BA681A-E08E-42A5-ACE6-CCD42520D73E</a:ObjectID>
<a:Name>IdProduit</a:Name>
<a:Code>idProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {1A28DFBE-0566-4D3D-B2D2-C6962E0F3A70}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDPRODUIT</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o126">
<a:ObjectID>E86F6B49-E576-405A-864C-E24E50A77578</a:ObjectID>
<a:Name>NomProduit</a:Name>
<a:Code>nomProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {B8A4A880-4465-4679-919A-4413BDDC1DAC}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>NOMPRODUIT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o127">
<a:ObjectID>61A549BB-716C-4875-858B-86E7DED78010</a:ObjectID>
<a:Name>DescriptionProduit</a:Name>
<a:Code>descriptionProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {960E656F-9161-4C39-9F4D-FC620337ADF1}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>DESCRIPTIONPRODUIT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o128">
<a:ObjectID>9A4F952A-24F9-4EC8-B325-57ABB8796FE4</a:ObjectID>
<a:Name>QuantiteMinProduit</a:Name>
<a:Code>quantiteMinProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {F1084721-E381-4109-9A14-C96A401245C6}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>QUANTITEMINPRODUIT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o129">
<a:ObjectID>AEA8B11E-93A4-4B2C-B25C-3DEAEF67EFF8</a:ObjectID>
<a:Name>QuantiteStockProduit</a:Name>
<a:Code>quantiteStockProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {CA736CF0-7F3E-438B-8399-D70C67DFAE24}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>QUANTITESTOCKPRODUIT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o130">
<a:ObjectID>DE8ECE75-1C19-4DC5-B4D8-59C48AC48310</a:ObjectID>
<a:Name>PrixProduit</a:Name>
<a:Code>prixProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {9553A1B0-01AF-4E3F-AC78-B77F8E0D2199}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>PRIXPRODUIT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o131">
<a:ObjectID>ABA9005B-D99F-44BE-A4D4-7A56478C0FBF</a:ObjectID>
<a:Name>Date&amp;HeureAjoutProduit</a:Name>
<a:Code>date&amp;HeureAjoutProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {E01B3320-97A3-486C-B4C9-953E5D61D796}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATE_HEUREAJOUTPRODUIT</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o132">
<a:ObjectID>7B1B0A71-7D37-4622-9E31-E5305C19B931</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {16AD98AF-3C20-4F5F-984C-92661D4BC563}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o125"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o132"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o83">
<a:ObjectID>8CBED6B2-4603-4927-9A53-761E78A812B2</a:ObjectID>
<a:Name>Payement</a:Name>
<a:Code>Payement</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {5359A285-AA87-4173-A772-0A6916F1598E}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>PAYEMENT</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o133">
<a:ObjectID>83CFC5CC-D7D2-4408-B386-66D195510DF2</a:ObjectID>
<a:Name>IdPayement</a:Name>
<a:Code>idPayement</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {9E59455A-CD90-4BE4-A6D5-8ECB0ECE502B}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDPAYEMENT</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o134">
<a:ObjectID>6CEECE08-9086-47B3-A45D-F9A14F587907</a:ObjectID>
<a:Name>TypePayement</a:Name>
<a:Code>typePayement</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {1CC02C96-045F-45F8-AB0F-95A4672048D6}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>TYPEPAYEMENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o135">
<a:ObjectID>BADBBF66-14B3-42B1-897E-2072F5C366AF</a:ObjectID>
<a:Name>MethodePayement</a:Name>
<a:Code>methodePayement</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {00A1D26B-A217-49DD-BDC1-F6614B93195F}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>METHODEPAYEMENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o136">
<a:ObjectID>7278CBFB-18E1-4122-AE54-9D94EDC2E7A3</a:ObjectID>
<a:Name>DatePayement</a:Name>
<a:Code>datePayement</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {31368FF2-F3A1-4BAF-97CE-B22F42C6FAAC}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATEPAYEMENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o137">
<a:ObjectID>0E5B7243-949C-4878-9720-A9241A7CFAF1</a:ObjectID>
<a:Name>StatusPayement</a:Name>
<a:Code>statusPayement</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {0BDD2385-85C3-4296-97B8-EB5DA32F6B1A}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>STATUSPAYEMENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o138">
<a:ObjectID>979518FB-E6BA-4A58-9D5F-61A254A2860D</a:ObjectID>
<a:Name>EtasPayement</a:Name>
<a:Code>etasPayement</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {56937611-89FE-4DFE-9D00-8975CCE2113B}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>ETASPAYEMENT</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o139">
<a:ObjectID>3278515C-8B8E-4F47-AA51-3E38D89E3B9D</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {CC1E74AF-BF96-4B91-A77B-6C53E85C5A15}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o133"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o139"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o84">
<a:ObjectID>FCFDB2F1-C50A-4428-817A-016A070406C9</a:ObjectID>
<a:Name>Avis</a:Name>
<a:Code>Avis</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {A41A4EEA-35E4-4BE3-BEF6-13E748DD2557}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>AVIS</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o140">
<a:ObjectID>C58E5F9F-923C-4475-8212-6EDAADC211E5</a:ObjectID>
<a:Name>IdAvis</a:Name>
<a:Code>idAvis</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {B0342EDF-E341-43DA-B87D-6D4FA238AFFA}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDAVIS</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o141">
<a:ObjectID>26640B2E-882C-4C5B-B864-B5EEE6D130E3</a:ObjectID>
<a:Name>NoteAvis</a:Name>
<a:Code>noteAvis</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {E2D97CFF-45E4-4350-AC5A-E7C828B44D2D}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>NOTEAVIS</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o142">
<a:ObjectID>F3266DD0-2F48-406C-859C-C747C53F6FAF</a:ObjectID>
<a:Name>CommentaireAvis</a:Name>
<a:Code>commentaireAvis</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {5349FD0C-3018-4853-89F5-EABD5E1DCF34}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>COMMENTAIREAVIS</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o143">
<a:ObjectID>584EC834-38F0-4E82-BAEA-80F9C513788B</a:ObjectID>
<a:Name>Date&amp;HeurePosteAvis</a:Name>
<a:Code>date&amp;HeurePosteAvis</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {5221B7D8-8517-402A-921D-7E5D49FF49C4}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATEPOSTEAVIS</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o144">
<a:ObjectID>5F82670A-D70F-4DAA-A14B-F1688673A3DF</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {617C55A2-322D-473B-9249-7D5101DE8E68}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o140"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o144"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o85">
<a:ObjectID>444F6399-FB86-4082-8F57-C26635B55FF0</a:ObjectID>
<a:Name>Boutique</a:Name>
<a:Code>Boutique</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {63E6B0D0-E6B1-4FBC-A546-6F41E1754319}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>BOUTIQUE</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o145">
<a:ObjectID>EDE54998-B322-4DA4-A5C0-BD20780105A3</a:ObjectID>
<a:Name>IdBoutique</a:Name>
<a:Code>idBoutique</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {CCBAF1CF-F633-4B11-B944-D206D5624D5B}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDBOUTIQUE</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o146">
<a:ObjectID>B349A71A-4209-4C63-B506-A2922F270633</a:ObjectID>
<a:Name>NomBoutique</a:Name>
<a:Code>nomBoutique</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {4FDDDD28-6F72-441F-BDD2-96ED289ACE24}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>NOMBOUTIQUE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o147">
<a:ObjectID>35D3B419-36E9-42BF-ABA4-DAA8176E7FA3</a:ObjectID>
<a:Name>LogoBoutique</a:Name>
<a:Code>logoBoutique</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {9F8E8F95-C15F-4F58-BD0F-1775B417230B}
DAT 1773913206</a:History>
<a:DataType>java.lang.Object</a:DataType>
<a:PersistentCode>LOGOBOUTIQUE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o148">
<a:ObjectID>7BC64728-5345-4998-8204-F4B46C06EC1B</a:ObjectID>
<a:Name>DescriptionBoutique</a:Name>
<a:Code>descriptionBoutique</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {AA516D92-2B66-4A98-A9AF-830940F385E4}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>DESCRIPTIONBOUTIQUE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o149">
<a:ObjectID>72ADB520-3AD7-469E-BB27-847DD7CB6C31</a:ObjectID>
<a:Name>AdresseBoutique</a:Name>
<a:Code>adresseBoutique</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {A7D33D40-4F5B-45B9-AEB0-1F370AE7858D}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>ADRESSEBOUTIQUE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o150">
<a:ObjectID>F9077729-B5F8-47FA-8FB1-A0A2B1DFE337</a:ObjectID>
<a:Name>MentionVerifierBoutique</a:Name>
<a:Code>mentionVerifierBoutique</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {154712B9-147E-4892-AAF2-44C6F3487662}
DAT 1773913206</a:History>
<a:DataType>boolean</a:DataType>
<a:PersistentCode>MENTIONVERIFIERBOUTIQUE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o151">
<a:ObjectID>4F48C5C2-B1AD-4A9D-89E3-5A47042AA788</a:ObjectID>
<a:Name>DateCreationBoutique</a:Name>
<a:Code>dateCreationBoutique</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {D686EE17-5A7A-44F0-A3F0-EF27C1DACD99}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATECREATIONBOUTIQUE</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o152">
<a:ObjectID>47C29B31-CBCA-45BA-875E-2B5739090AAF</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {CFB0DD1A-523A-45E2-8204-813F406F11FC}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o145"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o152"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o86">
<a:ObjectID>CD6D2ED1-893F-4972-A5E8-BD07F791697E</a:ObjectID>
<a:Name>Boost</a:Name>
<a:Code>Boost</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {3B85A03B-64B5-46E5-AEF7-BD0EC02F9FA5}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>BOOST</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o153">
<a:ObjectID>14DF0382-C09D-4123-8929-7B334BF9E6FC</a:ObjectID>
<a:Name>IdBoost</a:Name>
<a:Code>idBoost</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {01FFCD27-DC88-4ED3-91A7-B8CF0A49A2A0}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDBOOST</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o154">
<a:ObjectID>98534596-26B9-479E-9B1E-49F4807B0E10</a:ObjectID>
<a:Name>DateDBoost</a:Name>
<a:Code>dateDBoost</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {DFCF8069-5104-43C1-8177-707481C74CC6}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATEDBOOST</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o155">
<a:ObjectID>38D19653-BCEC-4C05-A4D3-1698551181CA</a:ObjectID>
<a:Name>DateFBoost</a:Name>
<a:Code>dateFBoost</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {7C64323E-4607-49E0-813A-7CEFAD089C80}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATEFBOOST</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o156">
<a:ObjectID>2721511F-B1A6-4F34-A921-312B5A029E06</a:ObjectID>
<a:Name>MontantBoost</a:Name>
<a:Code>montantBoost</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {05169E1C-9CB2-4499-8367-6797AD31E214}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>MONTANTBOOST</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o157">
<a:ObjectID>92128511-D32C-460C-99C3-A400D56DBF94</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {365C76A5-7B73-45EF-89FC-6E91ADD285D1}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o153"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o157"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o87">
<a:ObjectID>B7AABB3D-8560-4AAD-9134-100273E61DC9</a:ObjectID>
<a:Name>CathegorieProduit</a:Name>
<a:Code>CathegorieProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {2B370BCC-308A-491F-8D75-B32DEDFF4C60}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>CATHEGORIEPRODUIT</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o158">
<a:ObjectID>565D25B3-F412-44D0-969D-E052C4F3FDC4</a:ObjectID>
<a:Name>IdCathegorieProduit</a:Name>
<a:Code>idCathegorieProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {276937C1-78C3-4C6D-8614-C27F7E426841}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDCATHEGORIEPRODUIT</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o159">
<a:ObjectID>D64A4B49-A66D-44B9-8082-ECE509E182B4</a:ObjectID>
<a:Name>NomCathegorieProduit</a:Name>
<a:Code>nomCathegorieProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {C5763784-6E29-40FB-85D8-3275E78DDD12}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>NOMCATHEGORIEPRODUIT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o160">
<a:ObjectID>2F678071-1632-488A-A986-D162F096CF20</a:ObjectID>
<a:Name>NbreProduitCathegorieProduit</a:Name>
<a:Code>nbreProduitCathegorieProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {AF3827BC-8698-4479-9DFE-0AB010170B4A}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>NBREPRODUITCATHEGORIEPRODUIT</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o161">
<a:ObjectID>5B4AAB6C-59EA-40D9-A7BD-0246D85A63D5</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {9E2C7717-3680-4021-8D42-D1BB8831BEB7}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o158"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o161"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o88">
<a:ObjectID>45FBEE13-3875-49D7-B518-6E81FE06056C</a:ObjectID>
<a:Name>Panier</a:Name>
<a:Code>Panier</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {E148F989-7331-4088-BD20-02D2B92FAEFE}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>PANIER</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o162">
<a:ObjectID>6E286AD3-A55A-4FE0-86E9-5A8A91B0D30A</a:ObjectID>
<a:Name>IdPanier</a:Name>
<a:Code>idPanier</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {97F96CAA-F9D1-4093-A2F7-AFDCB2C877CD}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDPANIER</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o163">
<a:ObjectID>5B18386A-7FA7-4ECD-B07D-90EF935E2CAB</a:ObjectID>
<a:Name>QuantiteProduitPanier</a:Name>
<a:Code>quantiteProduitPanier</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {DAC3815B-90C9-4505-87D9-4EFCB7381CA3}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>QUANTITEPRODUITPANIER</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o164">
<a:ObjectID>25936E4E-A2E1-42D7-B99F-99B8BC650E53</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {37746FD5-4372-4C07-966B-FD90393EC2BA}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o162"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o164"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o89">
<a:ObjectID>B31D5505-E656-4A09-AB71-BA40DCD9D4FE</a:ObjectID>
<a:Name>Promo</a:Name>
<a:Code>Promo</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {D6051FDD-B6CC-4805-816A-BA3B7A5D8482}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>PROMO</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o165">
<a:ObjectID>C9D31E55-6EA4-463F-96BB-A82C2ED18250</a:ObjectID>
<a:Name>IdPromot</a:Name>
<a:Code>idPromot</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {14CAC523-E23E-4326-88C3-90CE4A50FA45}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDPROMOT</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o166">
<a:ObjectID>85673684-2B86-4609-8353-74BA0BE643B6</a:ObjectID>
<a:Name>CodePromot</a:Name>
<a:Code>codePromot</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {1518A8D3-4854-48B0-B807-6155EB84834A}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>CODEPROMOT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o167">
<a:ObjectID>167F278F-3A58-4AA9-9634-C21096456021</a:ObjectID>
<a:Name>DateDPromot</a:Name>
<a:Code>dateDPromot</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {6F2641D3-DF59-48AD-80B8-2143428644B5}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATEDPROMOT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o168">
<a:ObjectID>B6681AB6-9BCC-4700-B369-CB23535D1685</a:ObjectID>
<a:Name>DateFPromot</a:Name>
<a:Code>dateFPromot</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {B65CF9BE-0B7D-4BBF-94C9-BE72F8795B9A}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATEFPROMOT</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o169">
<a:ObjectID>0CF2DF92-8628-4CF8-9FB3-0B5C9151F36C</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {BE965760-78FE-4746-B79A-6A58CA44C169}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o165"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o169"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o90">
<a:ObjectID>BD81E5BF-0B18-422B-B7DC-D52374055E5D</a:ObjectID>
<a:Name>Client</a:Name>
<a:Code>Client</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {2ADB6933-8606-4FE8-8973-0312CF44F84B}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>CLIENT</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o170">
<a:ObjectID>82AA02B4-74D7-47F2-BB3F-6C98BB9FF910</a:ObjectID>
<a:Name>IdClient</a:Name>
<a:Code>idClient</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {E6AD3722-1529-437C-B5F7-424CED7A4D82}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDCLIENT</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o171">
<a:ObjectID>CBA46DC7-878D-41DF-A51A-BE2C6DAFB8CC</a:ObjectID>
<a:Name>NomClient</a:Name>
<a:Code>nomClient</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {120DDB02-5582-42DA-ADEA-B967E7C41E50}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>NOMCLIENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o172">
<a:ObjectID>787DFBBE-CF25-4559-A931-4CC784C13D5D</a:ObjectID>
<a:Name>PrenomClient</a:Name>
<a:Code>prenomClient</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {9DF35254-6E39-4C4D-843F-F24B16D89DB4}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>PRENOMCLIENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o173">
<a:ObjectID>58D8FC35-3BAD-4F79-B4B3-069D10640026</a:ObjectID>
<a:Name>EmailClient</a:Name>
<a:Code>emailClient</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {0E731D39-7521-451F-A399-6D36D5C0CD10}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>EMAILCLIENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o174">
<a:ObjectID>C7B290BA-3E03-4E61-AB6D-3F264FC83BDA</a:ObjectID>
<a:Name>PasswordClient</a:Name>
<a:Code>passwordClient</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {F382855F-F2F2-43CE-9A29-140783EF36F6}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>PASSWORDCLIENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o175">
<a:ObjectID>A5B50CC1-69B3-4551-8280-A826A3A66B52</a:ObjectID>
<a:Name>TelephoneClient</a:Name>
<a:Code>telephoneClient</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {A7FE5679-9B47-4F9B-8E61-8DB8CFACE567}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>TELEPHONECLIENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o176">
<a:ObjectID>156E0FFE-BD30-4725-B93C-FA6C5122BB25</a:ObjectID>
<a:Name>Date&amp;HeureInscriptionClient</a:Name>
<a:Code>date&amp;HeureInscriptionClient</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {3C1D5EDB-AEB4-4EF3-BF53-CE19B7934030}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATE_HEUREINSCRIPTIONCLIENT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o177">
<a:ObjectID>3B753DAB-170A-4738-BD97-827AAEA2F1F3</a:ObjectID>
<a:Name>DateUpdateClient</a:Name>
<a:Code>dateUpdateClient</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {A39613BC-781C-458F-8D77-5654333C553D}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATEUPDATECLIENT</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o178">
<a:ObjectID>F80A56AE-1E8A-4A50-90C7-7116DC42EE12</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {F018AFB3-42F2-4882-A0C2-2E365BC36F50}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o170"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o178"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o91">
<a:ObjectID>FC83092C-3051-43D6-B3F1-AFAA06D1C8B2</a:ObjectID>
<a:Name>Livreur</a:Name>
<a:Code>Livreur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {E4EDF28D-17DB-48A6-A6C6-4BB866A05B7E}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>LIVREUR</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o179">
<a:ObjectID>E07F1D69-6B62-4114-8192-922D23B04E55</a:ObjectID>
<a:Name>IdLivreur</a:Name>
<a:Code>idLivreur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {41502F88-2550-405C-826B-20784BE4153D}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>IDLIVREUR</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o180">
<a:ObjectID>8D0612CC-D403-4C48-85D4-10EA84710C97</a:ObjectID>
<a:Name>NomPrenomLivreur</a:Name>
<a:Code>nomPrenomLivreur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {3588416A-BB85-43B7-8586-4980B407612C}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>NOMPRENOMLIVREUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o181">
<a:ObjectID>210251E4-8245-4B7E-9C6A-3A362DF54C3A</a:ObjectID>
<a:Name>EmailLivreur</a:Name>
<a:Code>emailLivreur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {B2884150-B5B4-4948-A7EB-4AA1187DF55C}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>EMAILLIVREUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o182">
<a:ObjectID>36BFE94C-BF85-4BCB-B0D9-D5622EDB57F3</a:ObjectID>
<a:Name>passwordLivreur</a:Name>
<a:Code>passwordLivreur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {938746E8-DFAA-4595-945C-7301B5D52360}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>PASSWORDLIVREUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o183">
<a:ObjectID>15692313-5A33-4F64-9791-486BD2AF4117</a:ObjectID>
<a:Name>AdresseLivreur</a:Name>
<a:Code>adresseLivreur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {B230145F-C1E1-4408-91BD-AD5AE8E02BA7}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>ADRESSELIVREUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o184">
<a:ObjectID>511D9064-2EF2-4D3C-A443-11CA397D7C52</a:ObjectID>
<a:Name>TelephoneLivreur</a:Name>
<a:Code>telephoneLivreur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {89666255-7503-421C-9D6C-C10EF2CD71FC}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>TELEPHONELIVREUR</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o185">
<a:ObjectID>95B5408F-135A-4E5F-AC60-2B0B23A69047</a:ObjectID>
<a:Name>DescriptionLivreur</a:Name>
<a:Code>descriptionLivreur</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {2946B1B7-650E-42EB-A938-784C1D3AA6AA}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>DESCRIPTIONLIVREUR</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o186">
<a:ObjectID>6097B9F8-A4B7-417A-ADA0-0303659F97BB</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {D8CCB895-943E-4DC8-A97A-7172DD1AEE72}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o179"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o186"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o92">
<a:ObjectID>0956028B-2FA7-4047-A0E8-7A7A1F622DF4</a:ObjectID>
<a:Name>Adresse</a:Name>
<a:Code>Adresse</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {B4AEA1A9-931B-4034-8F30-14521E4A7B7A}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<a:PersistentCode>ADRESSE</a:PersistentCode>
<c:Attributes>
<o:Attribute Id="o187">
<a:ObjectID>691FBB3F-9F7F-49D2-8B44-961A0AA80227</a:ObjectID>
<a:Name>CodeAdresse</a:Name>
<a:Code>codeAdresse</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {3CD0DE02-D20A-4679-BE7E-5972A71BE699}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>CODEADRESSE</a:PersistentCode>
<a:Multiplicity>1..1</a:Multiplicity>
</o:Attribute>
<o:Attribute Id="o188">
<a:ObjectID>1B2D271E-24FD-41AE-AE71-B893E62D5B54</a:ObjectID>
<a:Name>LieuxAdresse</a:Name>
<a:Code>lieuxAdresse</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {1D2ACF46-6103-46C1-AD2B-AEBAEB504185}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>LIEUXADRESSE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o189">
<a:ObjectID>6C2BDA29-0F80-4763-A61E-BB69527D9154</a:ObjectID>
<a:Name>ContactAdresse</a:Name>
<a:Code>contactAdresse</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {FDDDA1BB-D008-49D7-8418-3B9587A5AB6F}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>CONTACTADRESSE</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o190">
<a:ObjectID>29D1B357-B4DB-455D-82CF-C89FF3B902A2</a:ObjectID>
<a:Name>Description</a:Name>
<a:Code>description</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {84FBA10B-8795-45E3-863E-58CBABC0B5A2}
DAT 1773913206</a:History>
<a:DataType>java.lang.String</a:DataType>
<a:PersistentCode>DESCRIPTION</a:PersistentCode>
</o:Attribute>
</c:Attributes>
<c:Identifiers>
<o:Identifier Id="o191">
<a:ObjectID>4ADE7B1D-00CC-4B9C-A656-AFAB194186F2</a:ObjectID>
<a:Name>Identifiant_1</a:Name>
<a:Code>IDENTIFIANT_1</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {01C97E6F-287C-4F0F-9EF2-8B6FDFCE914B}
DAT 1773913206</a:History>
<c:Identifier.Attributes>
<o:Attribute Ref="o187"/>
</c:Identifier.Attributes>
</o:Identifier>
</c:Identifiers>
<c:PrimaryIdentifier>
<o:Identifier Ref="o191"/>
</c:PrimaryIdentifier>
</o:Class>
<o:Class Id="o93">
<a:ObjectID>6CD8FF9F-9E8E-4A63-B453-BB22629622A5</a:ObjectID>
<a:Name>Appartenir</a:Name>
<a:Code>Appartenir</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {6E3B302F-FA1E-4E37-A0C7-364C605E2D7F}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<c:Attributes>
<o:Attribute Id="o192">
<a:ObjectID>2C93D78B-A7CF-4231-8AC3-A6FDDC82CBEF</a:ObjectID>
<a:Name>NbProduit</a:Name>
<a:Code>nbProduit</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {D1C0B007-BD64-4331-900B-882209D71740}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>NBPRODUIT</a:PersistentCode>
</o:Attribute>
</c:Attributes>
</o:Class>
<o:Class Id="o94">
<a:ObjectID>21BDFC99-1235-4577-AFDA-19424A3E5D86</a:ObjectID>
<a:Name>Constituer</a:Name>
<a:Code>Constituer</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {D5266DDE-F884-4BB2-A97C-ACB0D62BA137}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<c:Attributes>
<o:Attribute Id="o193">
<a:ObjectID>9F8B8240-975D-470C-8A1A-B9CF67BFAA0F</a:ObjectID>
<a:Name>DateAjoutP</a:Name>
<a:Code>dateAjoutP</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {29180473-458E-43CF-888A-964D90762293}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>DATEAJOUTP</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o194">
<a:ObjectID>1F269B20-3DAC-495B-B07A-C765F83D0466</a:ObjectID>
<a:Name>NbProduitAjout</a:Name>
<a:Code>nbProduitAjout</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {174CDDA0-5AEE-46DF-9F53-7A0F2F0AF995}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>NBPRODUITAJOUT</a:PersistentCode>
</o:Attribute>
<o:Attribute Id="o195">
<a:ObjectID>EB9E2A8C-3862-4D1C-9212-4EE852C8B356</a:ObjectID>
<a:Name>HeurAjoutP</a:Name>
<a:Code>heurAjoutP</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {90646E9F-61AC-4A57-8834-28D3444CCE93}
DAT 1773913206</a:History>
<a:DataType>java.util.Date</a:DataType>
<a:PersistentCode>HEURAJOUTP</a:PersistentCode>
</o:Attribute>
</c:Attributes>
</o:Class>
<o:Class Id="o95">
<a:ObjectID>F8CDBD00-289B-4EE6-95A3-7DA0D8EB1733</a:ObjectID>
<a:Name>Detenir</a:Name>
<a:Code>Detenir</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {31EC0D3F-A6A9-48F1-9A89-FDCE22ACD1B9}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<c:Attributes>
<o:Attribute Id="o196">
<a:ObjectID>F18CEB87-D927-41B6-B1FC-4BA3E6DF5498</a:ObjectID>
<a:Name>NbAdresse</a:Name>
<a:Code>nbAdresse</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {65BDF776-F03E-4929-BF67-126A8D59D58D}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>NBADRESSE</a:PersistentCode>
</o:Attribute>
</c:Attributes>
</o:Class>
<o:Class Id="o96">
<a:ObjectID>0E5DB994-9966-46CF-AFE5-4AB77F12B827</a:ObjectID>
<a:Name>Viser</a:Name>
<a:Code>Viser</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {4926A17D-E992-4312-B543-34C69E03865E}
DAT 1773913206</a:History>
<a:UseParentNamespace>0</a:UseParentNamespace>
<c:Attributes>
<o:Attribute Id="o197">
<a:ObjectID>45E28BB7-714D-4352-A110-64F342DFCE13</a:ObjectID>
<a:Name>NbPromot</a:Name>
<a:Code>nbPromot</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {936FD3D7-8159-4CA8-90B2-5D46CA246AC9}
DAT 1773913206</a:History>
<a:DataType>int</a:DataType>
<a:PersistentCode>NBPROMOT</a:PersistentCode>
</o:Attribute>
</c:Attributes>
</o:Class>
</c:Classes>
<c:Associations>
<o:Association Id="o10">
<a:ObjectID>3FE021B0-286B-4C99-A574-6EB53404AA44</a:ObjectID>
<a:Name>Avoir</a:Name>
<a:Code>avoir</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {27EEAE79-F28A-4698-918A-E63DC4B0CEF4}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o77"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o85"/>
</c:Object2>
</o:Association>
<o:Association Id="o13">
<a:ObjectID>2727F8FE-259E-465B-BBAA-CB83FA531B80</a:ObjectID>
<a:Name>Contenir</a:Name>
<a:Code>contenir</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {62AFA33C-C09B-4A43-80BA-E2FC54946297}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o85"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o82"/>
</c:Object2>
</o:Association>
<o:Association Id="o16">
<a:ObjectID>51063811-04FC-498F-A938-79413013899B</a:ObjectID>
<a:Name>Appartenir</a:Name>
<a:Code>appartenir</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {6E3B302F-FA1E-4E37-A0C7-364C605E2D7F}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..*</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,172={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,17=java.util.HashSet

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o82"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o87"/>
</c:Object2>
</o:Association>
<o:Association Id="o22">
<a:ObjectID>1A5B9D18-5238-4249-B230-7F3C78EF8299</a:ObjectID>
<a:Name>Constituer</a:Name>
<a:Code>constituer</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {D5266DDE-F884-4BB2-A97C-ACB0D62BA137}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>0..*</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,172={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,17=java.util.HashSet

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o82"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o88"/>
</c:Object2>
</o:Association>
<o:Association Id="o28">
<a:ObjectID>ACDD3C01-1124-4E76-9D46-48737139F9E0</a:ObjectID>
<a:Name>Posseder</a:Name>
<a:Code>posseder</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {56782059-691B-4F31-B36C-FC52E961B70A}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o90"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o88"/>
</c:Object2>
</o:Association>
<o:Association Id="o31">
<a:ObjectID>512BA9CE-5F97-4A2E-955F-12111461EAF2</a:ObjectID>
<a:Name>Concerner</a:Name>
<a:Code>concerner</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {5B0D59BA-FB78-416A-A2A3-A4C721D9B8EA}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o88"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o81"/>
</c:Object2>
</o:Association>
<o:Association Id="o34">
<a:ObjectID>B4C6E944-5522-4E64-AD70-E7B239E2E0F2</a:ObjectID>
<a:Name>Effectuer</a:Name>
<a:Code>effectuer</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {8C470208-F5C7-4F47-A19F-F79C3ADAA38F}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o90"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o83"/>
</c:Object2>
</o:Association>
<o:Association Id="o37">
<a:ObjectID>85295DFA-6E6B-4915-A163-93811D8BA59C</a:ObjectID>
<a:Name>Detenir</a:Name>
<a:Code>detenir</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {31EC0D3F-A6A9-48F1-9A89-FDCE22ACD1B9}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o90"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o92"/>
</c:Object2>
</o:Association>
<o:Association Id="o42">
<a:ObjectID>BFAA766A-9299-4C6B-88CA-926E86F23F5B</a:ObjectID>
<a:Name>Valider</a:Name>
<a:Code>valider</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {E19376EC-6764-41A9-90C7-5AECDAD43A40}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o83"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o81"/>
</c:Object2>
</o:Association>
<o:Association Id="o46">
<a:ObjectID>98B754BE-B797-4C27-9FE5-C35D3ABCDFCC</a:ObjectID>
<a:Name>Livrer</a:Name>
<a:Code>livrer</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {5FFED7BF-83AE-4890-984F-58A8AA4AE268}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>0..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o91"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o78"/>
</c:Object2>
</o:Association>
<o:Association Id="o48">
<a:ObjectID>B554598D-43E6-4522-9101-C1F7693DE25C</a:ObjectID>
<a:Name>Destiner</a:Name>
<a:Code>destiner</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {47CC65FC-F695-4FBC-B566-E923174556D8}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o92"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o78"/>
</c:Object2>
</o:Association>
<o:Association Id="o52">
<a:ObjectID>AA252BE1-61E7-48A5-9420-23CF6F8EFD47</a:ObjectID>
<a:Name>Renfermer</a:Name>
<a:Code>renfermer</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {F02A78F5-AD89-4DBD-B8A7-F46B193C330A}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o79"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o80"/>
</c:Object2>
</o:Association>
<o:Association Id="o54">
<a:ObjectID>7A886BB4-244E-4649-9B58-D05BE88F15EC</a:ObjectID>
<a:Name>Recevoir</a:Name>
<a:Code>recevoir</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {DE4051B2-308F-444E-88A2-E10210BEFEE5}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>0..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o77"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o80"/>
</c:Object2>
</o:Association>
<o:Association Id="o56">
<a:ObjectID>1546DACF-F3F1-4F65-8D82-32435A7FA73B</a:ObjectID>
<a:Name>Envoyer</a:Name>
<a:Code>envoyer</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {361B6E9A-7BEF-46F7-9E3F-62038AE80C56}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>0..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o90"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o80"/>
</c:Object2>
</o:Association>
<o:Association Id="o59">
<a:ObjectID>C7BC256E-E3AA-4E30-A6B1-35EB8096AAA9</a:ObjectID>
<a:Name>Associer</a:Name>
<a:Code>associer</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {CD022B86-DDFE-4060-ABA7-BFDBE3FD15EC}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>0..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o82"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o86"/>
</c:Object2>
</o:Association>
<o:Association Id="o62">
<a:ObjectID>3F3E5114-C66E-4FE8-910C-56E2C4113C23</a:ObjectID>
<a:Name>Viser</a:Name>
<a:Code>viser</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {4926A17D-E992-4312-B543-34C69E03865E}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..*</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,172={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,17=java.util.HashSet

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o82"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o89"/>
</c:Object2>
</o:Association>
<o:Association Id="o68">
<a:ObjectID>8984A970-0A38-4483-A716-E5D6782043A2</a:ObjectID>
<a:Name>Donner</a:Name>
<a:Code>donner</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {067C6D12-903A-453B-BDC2-B14AB10A0ECC}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>0..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o90"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o84"/>
</c:Object2>
</o:Association>
<o:Association Id="o70">
<a:ObjectID>A7BE3FE2-0D01-4213-98A2-1CB4ACDF5C3E</a:ObjectID>
<a:Name>Generer</a:Name>
<a:Code>generer</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {43A69B21-792C-43FA-9F48-79297039900B}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>1..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o78"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o81"/>
</c:Object2>
</o:Association>
<o:Association Id="o72">
<a:ObjectID>CD87C528-39CA-42F3-B53C-8A837FBB0DD7</a:ObjectID>
<a:Name>Inclure</a:Name>
<a:Code>inclure</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {BEDCA311-FD71-4049-8E88-910BA1A81028}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>0..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o78"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o84"/>
</c:Object2>
</o:Association>
<o:Association Id="o74">
<a:ObjectID>AFCF3E65-717E-40B6-8EB5-51322F04CBB1</a:ObjectID>
<a:Name>Disposer</a:Name>
<a:Code>disposer</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {55C2F169-2FFD-4F72-9CD0-5C198DE1CC83}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>0..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o82"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o84"/>
</c:Object2>
</o:Association>
<o:Association Id="o76">
<a:ObjectID>4C445218-FC3A-4472-8CC6-E371B9C74FAE</a:ObjectID>
<a:Name>Recolter</a:Name>
<a:Code>recolter</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:History>ORG {126D41CA-5183-4F8E-A55B-A82B2C4DA215}
DAT 1773913206</a:History>
<a:RoleAMultiplicity>0..*</a:RoleAMultiplicity>
<a:RoleBMultiplicity>1..1</a:RoleBMultiplicity>
<a:RoleANavigability>1</a:RoleANavigability>
<a:RoleBNavigability>0</a:RoleBNavigability>
<a:ExtendedAttributesText>{0DEDDB90-46E2-45A0-886E-411709DA0DC9},Java,224={F6FFC71C-C472-4261-A710-B0BCC0BF4D58},roleAImplementationClass,17=java.util.HashSet
{78C31404-0EE5-4FD0-9038-EE396B305F05},roleBContainer,6=&lt;None&gt;
{C11C9F66-6453-43A2-8824-6654518CF65A},roleBImplementationClass,6=&lt;None&gt;

</a:ExtendedAttributesText>
<c:Object1>
<o:Class Ref="o85"/>
</c:Object1>
<c:Object2>
<o:Class Ref="o84"/>
</c:Object2>
</o:Association>
</c:Associations>
<c:AssociationClassLinks>
<o:AssociationClassLink Id="o19">
<a:ObjectID>20A6DAE6-F94A-4209-BC33-9EC0A2A03772</a:ObjectID>
<a:CreationDate>0</a:CreationDate>
<a:Creator/>
<a:ModificationDate>0</a:ModificationDate>
<a:Modifier/>
<c:Object1>
<o:Class Ref="o93"/>
</c:Object1>
<c:Object2>
<o:Association Ref="o16"/>
</c:Object2>
</o:AssociationClassLink>
<o:AssociationClassLink Id="o25">
<a:ObjectID>02C8987E-61EE-4D9C-84B3-CF834EECA06D</a:ObjectID>
<a:CreationDate>0</a:CreationDate>
<a:Creator/>
<a:ModificationDate>0</a:ModificationDate>
<a:Modifier/>
<c:Object1>
<o:Class Ref="o94"/>
</c:Object1>
<c:Object2>
<o:Association Ref="o22"/>
</c:Object2>
</o:AssociationClassLink>
<o:AssociationClassLink Id="o40">
<a:ObjectID>6B2A515B-5EF4-4B57-8B48-AF4F5501FA70</a:ObjectID>
<a:CreationDate>0</a:CreationDate>
<a:Creator/>
<a:ModificationDate>0</a:ModificationDate>
<a:Modifier/>
<c:Object1>
<o:Class Ref="o95"/>
</c:Object1>
<c:Object2>
<o:Association Ref="o37"/>
</c:Object2>
</o:AssociationClassLink>
<o:AssociationClassLink Id="o65">
<a:ObjectID>09A37F49-DF89-423B-8485-8F589A670BA9</a:ObjectID>
<a:CreationDate>0</a:CreationDate>
<a:Creator/>
<a:ModificationDate>0</a:ModificationDate>
<a:Modifier/>
<c:Object1>
<o:Class Ref="o96"/>
</c:Object1>
<c:Object2>
<o:Association Ref="o62"/>
</c:Object2>
</o:AssociationClassLink>
</c:AssociationClassLinks>
<c:TargetModels>
<o:TargetModel Id="o198">
<a:ObjectID>706BF55C-6444-4FDE-90B5-DEE86A1677DF</a:ObjectID>
<a:Name>Java</a:Name>
<a:Code>Java</a:Code>
<a:CreationDate>1773913189</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913189</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:TargetModelURL>file:///%_OBJLANG%/java5-j2ee14.xol</a:TargetModelURL>
<a:TargetModelID>0DEDDB90-46E2-45A0-886E-411709DA0DC9</a:TargetModelID>
<a:TargetModelClassID>1811206C-1A4B-11D1-83D9-444553540000</a:TargetModelClassID>
<c:SessionShortcuts>
<o:Shortcut Ref="o4"/>
</c:SessionShortcuts>
</o:TargetModel>
<o:TargetModel Id="o199">
<a:ObjectID>77C45FCB-5CAE-435F-94AA-9506CAE14B6C</a:ObjectID>
<a:Name>WSDL for Java</a:Name>
<a:Code>WSDLJava</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:TargetModelURL>file:///%_XEM%/WSDLJ2EE.xem</a:TargetModelURL>
<a:TargetModelID>C8F5F7B2-CF9D-4E98-8301-959BB6E86C8A</a:TargetModelID>
<a:TargetModelClassID>186C8AC3-D3DC-11D3-881C-00508B03C75C</a:TargetModelClassID>
<c:SessionShortcuts>
<o:Shortcut Ref="o5"/>
</c:SessionShortcuts>
</o:TargetModel>
<o:TargetModel Id="o200">
<a:ObjectID>6B464DF0-207B-43DF-8238-31C9ADEE7475</a:ObjectID>
<a:Name>MCDSafinpay</a:Name>
<a:Code>MCDSAFINPAY</a:Code>
<a:CreationDate>1773913206</a:CreationDate>
<a:Creator>iCore</a:Creator>
<a:ModificationDate>1773913206</a:ModificationDate>
<a:Modifier>iCore</a:Modifier>
<a:TargetModelURL>file:///C|/Users/iCore/Desktop/Safinpay/BDD/MCDSafinpay.mcd</a:TargetModelURL>
<a:TargetModelID>07675B7F-3CFC-41D3-BD9D-0EFD73E98726</a:TargetModelID>
<a:TargetModelClassID>1E597170-9350-11D1-AB3C-0020AF71E433</a:TargetModelClassID>
<c:SessionShortcuts>
<o:Shortcut Ref="o3"/>
</c:SessionShortcuts>
</o:TargetModel>
</c:TargetModels>
</o:Model>
</c:Children>
</o:RootObject>

</Model>