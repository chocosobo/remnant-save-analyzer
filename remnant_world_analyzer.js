sublocations = {
    "RootCultist": "�ٿ��� ���",
    "RootWraith": "������ ����",
    "RootBrute": "������� ���",
    "Brabus": "�������� ���",
    "RootTumbleweed": "�ھ�Ų ��",
    "RootEnt": "�������� ����",
    "RootDragon": "�������� ����",
    "HuntersHideout": "������ ����",
    "MadMerchant": "��������",
    "LizAndLiz": "�ð���",
    "LastWill": "������ ���� ã��",
    "RootShrine": "������",
    "SwarmMaster": "��ö�� �տ�",
    "HoundMaster": "����",
    "Sentinel": "�ð��� ����",
    "Vyr": "������ ����",
    "WastelandGuardian": "���� �¾��� ��Ʋ",
    "TheHarrow": "��Ŀ",
    "TheLostGantry": "�¾��� Ȧ",
    "ArmorVault": "�������� �ݰ�",
    "TheCleanRoom": "�����ϴ� Ȧ",
    "SlimeHulk": "�ͻ����� ����",
    "Fatty": "���볪�� ����",
    "Tyrant": "�𼼰�",
    "SwampGuardian": '����',
    'KinCaller': "������ Ȧ",
    "BlinkFiend": "������ ���",
    'StuckMerchant': "��ȣ���� ����",
    'BlinkThief': '������ ���ϵ�',
    "StormCaller": "�̴����� ����",
    "ImmolatorAndZephyr": "�����׾�� ����",
    'Wolf': "���� �����",
    'TotemFather': "��ǳ�� ��",
    'TheRisen': "���ϳ����� �ְ�",
    'DoeShrine': "������ ���ǽ�",
    'WolfShrine': "�������� ����",
    "Splitter": "������ ������ ����",
    "BarbTerror": "NeedleLair",
    "QueensTemple": "IskalTemple",
    "BrainBug": "�̻��� ���",
    "Wisp": "��ȭ�� ��",
    "FetidPool": "���볪�� ������",
    "FlickeringHorror": "�ӻ迩���� Ȧ"
}

mainLocations = {
 "City Overworld Zone1": "����",
 "City Overworld Zone2": "����Ʈ��Ʈ",
 "Wasteland Overworld Zone1": "������ �ٶ�",
 "Wasteland Overworld Zone2": "��������� Ȳ����",
 "Jungle Overworld Zone1": "�ŷ��� ����",
 "Jungle Overworld Zone2": "�Ĵ������� ����",
 "Swamp Overworld Zone1": "���볪�� ����",
 "Swamp Overworld Zone2": "�ڹ� �� ������"
}

function loadFile(o) {
    
    var fr = new FileReader();
    fr.onload = function(e)
        {
            showDataFile(e, o);
        };
    fr.readAsText(o.files[0]);
}


function getWorldData(textArray, worldMode) {

    zones = {}
            
    zones["Earth"] = {}
    zones["Rhom"] = {}
    zones["Yaesha"] = {}
    zones["Corsus"] = {}
    
    var currentMainLocation; 

    if (worldMode == "#adventure") {
        currentMainLocation = textArray[3].split("/")[1].split("_")[1]
        console.log(currentMainLocation)
    } else {
        currentMainLocation = "Fairview"
    }

    var currentSublocation = "";

    for (i=0; i < textArray.length; i ++) {
        var zone;
        var eventType;
        var eventName;
        var lastEventname;
        var inSmallDungeon = true;

        textLine = textArray[i]
        if ( textLine.search("World_City") != -1) {
            zone = "Earth"
        }
        if ( textLine.search("World_Wasteland") != -1) {
            zone = "Rhom"
        }
        if ( textLine.search("World_Jungle") != -1) {
            zone = "Yaesha"
        }
        if ( textLine.search("World_Swamp") != -1) {
            zone = "Corsus"
        }

        lastEventname = eventName

        console.log(textLine)

        if (textLine.search("SmallD") != -1) {
            eventType = "Side Dungeon"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            } 
            inSmallDungeon = true
        }
        if (textLine.search("OverworldPOI") != -1) {
            eventType = "Point of Interest"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = currentMainLocation
            if (worldMode == "#adventure") {
                currentSublocation = ''
            }
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            } 
            inSmallDungeon = true
        }
        if (textLine.search("Quest_Boss") != -1) {
            eventType = "World Boss"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            } 
        }
        if (textLine.search("Siege") != -1) {
            eventType = "Siege"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            } 
        }
        if (textLine.search("Mini") != -1) {
            eventType = "Miniboss"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            } 
        }
        if (textLine.search("Quest_Event") != -1) {
            eventType = "Item Drop"
            eventName = textLine.split("/")[3].split("_")[2]

        // edge case for out of order items
        if (textLine.split("/")[1].split("_")[1] != textArray[i - 1].split("/")[1].split("_")[1]) {
            currentSublocation = ''
        }

    }

    if (textLine.search("Overworld_Zone") != -1) {
        currentMainLocation = textLine.split("/")[3].split("_")[1] + " " + textLine.split("/")[3].split("_")[2] + " " +  textLine.split("/")[3].split("_")[3]
        currentMainLocation = mainLocations[currentMainLocation]
    }
    
    if (eventName != lastEventname) {
      // Replacements
        if (eventName != undefined) {
             eventName = eventName.replace('FlickeringHorror', '���� �Դ� ��').replace('Wisp', '���� ��ġ').replace('HoundMaster', '����').replace('GunslingersCharm', '�������� ����').replace('MadMerchant', '��ġ���� ����').replace('TheRisen', '���ִϸ�����').replace('LizAndLiz', '��ī�� Ÿ�ڱ�').replace('Fatty', '�Ұ��� ��').replace('WastelandGuardian', 'Ŭ����').replace('RootEnt', '���� ����').replace('Wolf', '����').replace('RootDragon', '����').replace('SwarmMaster', 'ä���').replace('RootWraith', '������ ��').replace('RootTumbleweed', '������').replace('Kincaller', '������ ������').replace('Tyrant', '�뿪��').replace('Vyr', '�ڵ��� �ڿ� �м���').replace('ImmolatorAndZephyr', '��ȭ�ڿ� �׽���').replace('RootBrute', '���ָ�').replace('SlimeHulk', '�˾絢��').replace('BlinkFiend', '�Ͱ��� �ۺ״� ��').replace('Sentinel', 'ö����').replace('Penitent', '������ �����').replace('LastWill', '���� ����').replace('SwampGuardian', '�̽Ǹ���').replace('Splitter', '����� ����').replace('Brabus', '������').replace('Hound Master', '����').replace('Gunslingers Charm', '�������� ����').replace('Simulacrum', '�ùĶ�ũ��').replace('Pocket Watch', 'ȸ�߽ð�').replace('Mud Tooth', '�ӵ�����').replace('Wailing Wood', '���¢�� ����').replace('Stuck Merchant', '��¦�ʴ� ����').replace('The Lost Gantry', '�Ҿ���� ������').replace('Trait Book', '������ ��').replace('Drifter Mask', '������� ����').replace('The Harrow', '�������').replace('Storm Caller', '��ǳ�� �θ��� ��').replace('Twisted Idol', '��Ʋ�� ���').replace('Galenic Charm', '������ ����').replace('Brutal Mark', '�߸��� ǥ��').replace('Cleansing Jewel', '��ȭ�� ����').replace('Menders Charm', 'ġ������ ����').replace('Rock of Anguish', '������ ����').replace('Butchers Fetish', '�������� ��Ƽ��').replace('Storm Amulet', '��ǳ�� �����').replace('Vengeance Idol', '������ ���').replace('Soul Anchor', '��ȥ�� ��').replace('Scavengers Bauble	', '��ö �������� �α��� ����').replace('Heart Seeker', '���� ������').replace('Mothers Ring', '��Ӵ��� ����').replace('Pillar Of Stone', '�� ���').replace('Ring Of Evasion', 'ȸ���� ����').replace('Sagestone', '������ ��').replace('Braided Thorns', '���� ����').replace('Root Circlet', '�Ѹ��� ��').replace('Leech Ember', '�ŸӸ� �װɺ�').replace('Hunters Halo', '��ɲ��� ����').replace('Gravity Stone', '�߷��� ��').replace('Ezlans Band', '������� ��').replace('Band Of Strength', '���� ��').replace('Jewel Of The Black Sun', '���� �¾��� ����').replace('Blood Font', '���� ����').replace('Devouring Loop', '�������� ��').replace('Razor Stone', '��ī�ο� ��').replace('Stone Of Balance', '������ ��').replace('Keepers Ring', '�������� ����').replace('Hunters Band', '��ɲ��� ��').replace('Celerity Stone', '����� ��').replace('Guardians Ring', '��ȣ���� ����').replace('Heart Of The Wolf', '������ ����').replace('PocketWatch', 'ȸ�߽ð�').replace('MudTooth', '�ӵ�����').replace('WailingWood', '���¢�� ����').replace('StuckMerchant', '��¦�ʴ� ����').replace('TheLostGantry', '�Ҿ���� ������').replace('TraitBook', '������ ��').replace('DrifterMask', '������� ����').replace('TheHarrow', '�������').replace('StormCaller', '��ǳ�� �θ��� ��').replace('TwistedIdol', '��Ʋ�� ���').replace('GalenicCharm', '������ ����').replace('BrutalMark', '�߸��� ǥ��').replace('CleansingJewel', '��ȭ�� ����').replace('MendersCharm', 'ġ������ ����').replace('RockOfAnguish', '������ ����').replace('ButchersFetish', '�������� ��Ƽ��').replace('StormAmulet', '��ǳ�� �����').replace('VengeanceIdol', '������ ���').replace('SoulAnchor', '��ȥ�� ��').replace('ScavengersBauble', '��ö �������� �α��� ����').replace('HeartSeeker', '���� ������').replace('MothersRing', '��Ӵ��� ����').replace('PillarOfStone', '�� ���').replace('RingOfEvasion', 'ȸ���� ����').replace('Sagestone', '������ ��').replace('BraidedThorns', '���� ����').replace('RootCirclet', '�Ѹ��� ��').replace('LeechEmber', '�ŸӸ� �װɺ�').replace('HuntersHalo', '��ɲ��� ����').replace('GravityStone', '�߷��� ��').replace('EzlansBand', '������� ��').replace('BandOfStrength', '���� ��').replace('JewelOfTheBlackSun', '���� �¾��� ����').replace('BloodFont', '���� ����').replace('DevouringLoop', '�������� ��').replace('RazorStone', '��ī�ο� ��').replace('StoneOfBalance', '������ ��').replace('KeepersRing', '�������� ����').replace('HuntersBand', '��ɲ��� ��').replace('CelerityStone', '����� ��').replace('GuardiansRing', '��ȣ���� ����').replace('HeartOfTheWolf', '������ ����').replace('HuntersHideout', '��ɲ��� ����ó').replace('TotemFather', '���� �ƹ�').replace('Ruins', '����').replace('Flautist', '�� ������').replace('StuckMerchant', '��¦�ʴ� ����').replace('TheElfQueen', '���� ������ ó��').replace('OldManAndConstruct', 'Ȳ���� ����').replace('Monolith', '����').replace('ArmorVault', '��ī�� �ݰ�').replace('Settlement', '�Ƚ�ó').replace('AcesCoin', '�̻��� ����').replace('ReggiesRing', '�� �ٷ� ����')
            
        }
       
        if (zone != undefined && eventType != undefined && eventName != undefined) {

            if (zones[zone][eventType] != undefined) {
                if (zones[zone][eventType].search(eventName) == -1) {
                    zones[zone][eventType] += ", " + eventName

                    if (worldMode == "#adventure") {
                        mainLocationText = ''
                    } else {
                        mainLocationText = currentMainLocation.split(/(?=[A-Z])/).join(' ') + ": "
                    }
                    html = "<tr><td>" + zone + ": " + mainLocationText + currentSublocation.split(/(?=[A-Z])/).join(' ') +  "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"   
                }       
            } else {
                zones[zone][eventType] = eventName

                    if (worldMode == "#adventure") {
                        mainLocationText = ''
                    } else {
                        mainLocationText = currentMainLocation.split(/(?=[A-Z])/).join(' ') + ": "
                    }

                    html = "<tr><td>" + zone + ": " + mainLocationText + currentSublocation.split(/(?=[A-Z])/).join(' ') +  "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"     
            }
            $(worldMode).append(html)
        }
        $('#filters, #filters-right').show()
    }            
}


}



function showDataFile(e, o){

    $('tr:not(.header-row)').remove()

    text = e.target.result 
    text = text.split("/Game/Campaign_Main/Quest_Campaign_Ward13.Quest_Campaign_Ward13")[0]
    text = text.split("/Game/Campaign_Main/Quest_Campaign_City.Quest_Campaign_City")[1].replace(/Game/g,"\n")
    
    textArray = text.split("\n")


   adText = e.target.result
    adText = adText.split(/\/Quests\/Quest_AdventureMode(.+)/)[1]
    if (adText != undefined) {
        adventureMode = true
        adText = adText.replace(/Game/g,"\n")
        adTextArray = adText.split("\n")
    } else {
        adventureMode = false
    }

        
   

    if (adventureMode) {
        getWorldData(adTextArray, "#adventure")
    }  
    getWorldData(textArray, "#main")


}

$( document ).ready(function() {
    $('#toggle-items').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Item Drop') != -1) {
                $(this).parent().show()
            }
        })
    })
     $('#toggle-sd').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Side Dungeon') != -1) {
                $(this).parent().show()
            }
        })
    })
    $('#toggle-mb').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Miniboss') != -1) {
                $(this).parent().show()
            }
        })
    })
    $('#toggle-adv').on('click', function() {
       $('.main-mode, .adventure-mode').toggle()
       if ($(this).text() == "Show Adventure Mode") {
        $(this).text("Show Campaign Mode") 
       } else {
         $(this).text("Show Adventure Mode")
       }
    })
    $('#toggle-poi').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Point') != -1) {
                $(this).parent().show()
            }
        })
    })
    $('#toggle-bosses').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('World Boss') != -1) {
                $(this).parent().show()
            }
        })     
    })
    $('#toggle-sieges').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Siege') != -1) {
                $(this).parent().show()
            }
        })     
    })
    $('#toggle-earth').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Earth') != -1) {
                $(this).parent().show()
            }
        })     
    })
    $('#toggle-rhom').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Rhom') != -1) {
                $(this).parent().show()
            }
        })     
    })
    $('#toggle-corsus').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Corsus') != -1) {
                $(this).parent().show()
            }
        })     
    })
    $('#toggle-yaesha').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Yaesha') != -1) {
                $(this).parent().show()
            }
        })     
    })
        $('.toggle-all').on('click', function() {
            $('tr').show()
    })
})
