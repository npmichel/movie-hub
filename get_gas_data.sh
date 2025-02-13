#Connexion au serveur GAS en Secure ftp (sftp) et copie des fichier du repertoire out vers le VM pour traiter par la suite
sftp -oPort=2222 monalerting_0622@gas.pin.dolmen.bouyguestelecom.fr << EOF
#ls -ll out/
cd out/
get * "/opt/application/portail_irma/DATA_IRMA/INPUT_GAS/"
bye
EOF

if [ $? -ne 0 ]; then
        exit
else
        echo "GAZ data collecting is done !"
        #Begin processing
        for file in $(ls -A $input_gas ); do
                export file
                if [[ $file = "NODE_DPS_SAP_PTNMobile.csv" ]]; then
                        sed -i '1i"Equipement","Modele","Service Type","Service ID","Customer","Service name SAP","VPLS Route","Interface SAP","SAP","VLAN","Port","Type de port","Port mode","Egress Scheduler Policy","New Egress Scheduler Policy REF","Conformite New Egress Scheduler Policy","Ingress-buffer-alloc","Ingress-buffer-alloc REF","Conformite Ingress-buffer-alloc","Egress Percentage of rate","Ingress-Percentage of rate","Ing-weight Access","Ing-weight Access REF","Conformite Ing-weight Access","Ing-weight Network","Ing-weight Network REF","Conformite Ing-weight Network","Egr-weight Access","Egr-weight Access REF","Conformite Egr-weight Access","Egr-weight Network","Egr-weight Network REF","Conformite Egr-weight Network","Admin state","Oper state","Config speed","Oper speed","Config duplex","Oper duplex","Qos Ingress","Qos Egress","Port Egress Rate","Max rate","Ingress REF","New Ingress REF","Conformite Ingress","Conformite New Ingress","Egress REF","New  Egress REF","Conformite Egress","Conformite New  Egress","Conformite","DPS debug","Type de Client","Egr-perctage of rate REF","Conformite Egr-perctage of rate","Adresse IP interface","Masque du scope","TaskID","Status","Port Egress Rate REF","Nom du MSS","Debit du MSS","Version","Localisation","Date du check"' $input_gas"NODE_DPS_SAP_PTNMobile.csv"
                mv  $input_gas"NODE_DPS_SAP_PTNMobile.csv" "/opt/application/portail_irma/DATA_IRMA/BDE/"
                elif [[ $file = "TTI_LT_OMEGA_CSG_Inventaire_Services.csv" ]]; then
                        sed -i '1i "Equipement","Modele","Version","Localisation","Interface","Type dinterface","Interface description","Admin State","Oper State","Line Protocol state","BW (Kb/s)","Speed (Mb/s)","SFP Type","SFP part number","WaveLength","MTU","IP MTU","IP address","Mask","Mac address","Number of Member","Members of bundle","Bundle de rattachement","VLAN","VRF","LLDP neighbor","LLDP neighbor Bundle","LLDP neighbor Port","Service-Policy Input","Service-Policy Output_1","Service-Policy Output_2","Service-Policy Map Shaping","Policy-Map Shaper","Percent shape","shape Value(Mb/s)","Date de check"' $input_gas"TTI_LT_OMEGA_CSG_Inventaire_Services.csv"
                mv $input_gas"TTI_LT_OMEGA_CSG_Inventaire_Services.csv" "/opt/application/portail_irma/DATA_IRMA/BDE/"
                elif [[ $file = "TTI_LT_OMEGA_CSG_NOKIA_SAP_Compliance.csv" ]]; then
                        sed -i -e '1i"Equipement","Version","IP System","Localisation","Customer","Service ID","Service Name","Service Type","Interface","SAP","LAG","LAG description","Port","Type de port","Port description ","Admin state","Oper State","Config Speed","Oper Speed","Auto Neg status","Conformite Auto Neg Status","SAP-ingress REF","SAP-ingress","Conformite SAP-ingress","Egress-remark-policy","REF Egress-remark-policy","Conformite Egress-remark-policy","Egress-port-qos-policy","REF Egress-port-qos-policy","Conformite Egress-port-qos-policy","Egress-Rate","Tx Output Power","Tx High Alarm","Tx High Warning","Tx Low Warning","Tx Low Alarm","Conformite Tx Power","Rx Output Power","Rx High Alarm","Rx High Warning","Rx Low Warning","Rx Low Alarm","Conformite Rx Power","adresse IP interface","Masque du scope","Date du check"' $input_gas"TTI_LT_OMEGA_CSG_NOKIA_SAP_Compliance.csv"
                mv $input_gas"TTI_LT_OMEGA_CSG_NOKIA_SAP_Compliance.csv" "/opt/application/portail_irma/DATA_IRMA/BDE/"
                elif [[ $file = "TTI_LT_OMEGA_CTR_Inventaire_Services.csv" ]]; then
                        sed -i '1i "Equipement","Modele","Version","Localisation","Interface","Type dinterface","Interface description","Admin State","Physical State","Protocol state","BW (Kb/s)","Speed (Mb/s)","SFP Type","MTU","IP MTU","IP address","Mask","Mac address","Number of Member","Members of bundle","Vlan","VRF","LLDP neighbor","LLDP neighbor Bundle","LLDP neighbor Port","Service-Policy Input","Service-Policy Output_1","Service-Policy Output_2","Service-Policy Map Shaping","Policy-Map Shaper","Percent shape","shape Value(Mb/s)","Date de check"' $input_gas"TTI_LT_OMEGA_CTR_Inventaire_Services.csv"
                mv $input_gas"TTI_LT_OMEGA_CTR_Inventaire_Services.csv" "/opt/application/portail_irma/DATA_IRMA/BDE/"

                elif [[ $file = "DOR_OPM_LT_CSG_Cisco_InventaireARP_ClientVPRN.csv" ]]; then
                        sed -i '1i "Equipement","Version","Modele","Service Type","Service ID","Interface SAP","Interface description","Port/Lag","Adresse mac routeur","Adresse IP Client","Adresse IP routeur","Adresse Mac client","LAG","Date de Check"' $input_gas"DOR_OPM_LT_CSG_Cisco_InventaireARP_ClientVPRN.csv"
                mv $input_gas"DOR_OPM_LT_CSG_Cisco_InventaireARP_ClientVPRN.csv" "/opt/application/portail_irma/DATA_IRMA/BDOR/"
                elif [[ $file = "DOR_OPM_LT_CSG_Nokia_InventaireARP_ClientVPRN.csv" ]]; then
                        sed -i '1i "Equipement","Version","Modele","Service Type","Service ID","Customer","Service Name SAP","Interface SAP","SAP","VLAN","Port","Type de port","Port mode","AdminState","Oper State","Config Speed","Oper Speed","Config duplex","Oper Duplex","Adresse IP interface","Masque du scope","Adresse mac routeur","Adresse IP Client","Adresse Mac client","LAG","Date de check"' $input_gas"DOR_OPM_LT_CSG_Nokia_InventaireARP_ClientVPRN.csv"
                mv $input_gas"DOR_OPM_LT_CSG_Nokia_InventaireARP_ClientVPRN.csv" "/opt/application/portail_irma/DATA_IRMA/BDOR/"

                elif [[ $file = "DOR_OPM_LT_CTR_InventaireARP_ClientVPRN.csv" ]]; then
                        sed -i '1i "Equipement" ,"Version","Modele","Service Type","Service ID","Interface SAP","Interface description","Port/Lag","Adresse mac routeur","Adresse IP Client","Adresse IP routeur","Adresse Mac client","LAG","Date de Check"' $input_gas"DOR_OPM_LT_CTR_InventaireARP_ClientVPRN.csv"
                mv $input_gas"DOR_OPM_LT_CTR_InventaireARP_ClientVPRN.csv" "/opt/application/portail_irma/DATA_IRMA/BDOR/"

                fi
        done;
