sublocations = {
    "RootCultist": "근원의 통로",
    "RootWraith": "숨겨진 성소",
    "RootBrute": "가라앉은 통로",
    "Brabus": "범죄자의 통로",
    "RootTumbleweed": "뒤엉킨 길",
    "RootEnt": "숨막히는 분지",
    "RootDragon": "재투성이 공터",
    "HuntersHideout": "숨겨진 동굴",
    "MadMerchant": "쓰레기장",
    "LizAndLiz": "시가지",
    "LastWill": "원숭이 열쇠 찾기",
    "RootShrine": "교수대",
    "SwarmMaster": "강철의 균열",
    "HoundMaster": "땅굴",
    "Sentinel": "올가미 협곡",
    "Vyr": "열정의 신전",
    "WastelandGuardian": "검은 태양의 베틀",
    "TheHarrow": "벙커",
    "TheLostGantry": "태양의 홀",
    "ArmorVault": "선지자의 금고",
    "TheCleanRoom": "제거하는 홀",
    "SlimeHulk": "익사자의 수렁",
    "Fatty": "악취나는 공터",
    "Tyrant": "모세관",
    "SwampGuardian": '동굴',
    'KinCaller': "심판의 홀",
    "BlinkFiend": "과부의 통로",
    'StuckMerchant': "수호자의 성지",
    'BlinkThief': '잊혀진 지하돔',
    "StormCaller": "이단자의 둥지",
    "ImmolatorAndZephyr": "말라죽어가는 마을",
    'Wolf': "재해 출몰지",
    'TotemFather': "폭풍의 장",
    'TheRisen': "아하나에의 애가",
    'DoeShrine': "과부의 제의실",
    'WolfShrine': "순교자의 성지",
    "Splitter": "연구소 정거장 알파",
    "BarbTerror": "NeedleLair",
    "QueensTemple": "IskalTemple",
    "BrainBug": "이상한 통로",
    "Wisp": "부화의 관",
    "FetidPool": "악취나는 웅덩이",
    "FlickeringHorror": "속삭여오는 홀"
}

mainLocations = {
 "City Overworld Zone1": "페어뷰",
 "City Overworld Zone2": "웨스트코트",
 "Wasteland Overworld Zone1": "동방의 바람",
 "Wasteland Overworld Zone2": "쓰레기더미 황무지",
 "Jungle Overworld Zone1": "신록의 숲길",
 "Jungle Overworld Zone2": "후덥지근한 공터",
 "Swamp Overworld Zone1": "악취나는 공터",
 "Swamp Overworld Zone2": "박무 낀 소택지"
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
             eventName = eventName.replace('FlickeringHorror', '꿈을 먹는 자').replace('Wisp', '위습 고치').replace('HoundMaster', '폭군').replace('GunslingersCharm', '총잡이의 부적').replace('MadMerchant', '미치광이 상인').replace('TheRisen', '리애니메이터').replace('LizAndLiz', '시카고 타자기').replace('Fatty', '불결한 자').replace('WastelandGuardian', '클라비거').replace('RootEnt', '나무 정령').replace('Wolf', '재해').replace('RootDragon', '신지').replace('SwarmMaster', '채찍꾼').replace('RootWraith', '감싸인 자').replace('RootTumbleweed', '난도꾼').replace('Kincaller', '투기장 관리인').replace('Tyrant', '노역꾼').replace('Vyr', '뒤덮는 자와 분쇄자').replace('ImmolatorAndZephyr', '방화자와 그슬음').replace('RootBrute', '빛주먹').replace('SlimeHulk', '궤양덩이').replace('BlinkFiend', '맹공을 퍼붓는 자').replace('Sentinel', '철거자').replace('Penitent', '레토의 목걸이').replace('LastWill', '돌격 소총').replace('SwampGuardian', '이실리스').replace('Splitter', '찢기는 가죽').replace('Brabus', '브라버스').replace('Hound Master', '폭군').replace('Gunslingers Charm', '총잡이의 부적').replace('Simulacrum', '시뮬라크럼').replace('Pocket Watch', '회중시계').replace('Mud Tooth', '머드투스').replace('Wailing Wood', '울부짖는 나무').replace('Stuck Merchant', '꼼짝않는 상인').replace('The Lost Gantry', '잃어버린 지지대').replace('Trait Book', '지식의 고서').replace('Drifter Mask', '방랑자의 가면').replace('The Harrow', '쟁쇠장이').replace('Storm Caller', '폭풍을 부르는 자').replace('Twisted Idol', '뒤틀린 우상').replace('Galenic Charm', '갈레닉 부적').replace('Brutal Mark', '야만의 표식').replace('Cleansing Jewel', '정화의 보석').replace('Menders Charm', '치유사의 부적').replace('Rock of Anguish', '격통의 바위').replace('Butchers Fetish', '도살자의 페티쉬').replace('Storm Amulet', '폭풍의 목걸이').replace('Vengeance Idol', '복수의 우상').replace('Soul Anchor', '영혼의 닻').replace('Scavengers Bauble	', '고철 수집가의 싸구려 보석').replace('Heart Seeker', '심장 추적기').replace('Mothers Ring', '어머니의 반지').replace('Pillar Of Stone', '돌 기둥').replace('Ring Of Evasion', '회피의 반지').replace('Sagestone', '현자의 돌').replace('Braided Thorns', '꼬은 가시').replace('Root Circlet', '뿌리의 관').replace('Leech Ember', '거머리 잉걸불').replace('Hunters Halo', '사냥꾼의 광륜').replace('Gravity Stone', '중력의 돌').replace('Ezlans Band', '에즐란의 띠').replace('Band Of Strength', '힘의 띠').replace('Jewel Of The Black Sun', '검은 태양의 보석').replace('Blood Font', '피의 서약').replace('Devouring Loop', '삼켜지는 고리').replace('Razor Stone', '날카로운 돌').replace('Stone Of Balance', '균형의 돌').replace('Keepers Ring', '문지기의 반지').replace('Hunters Band', '사냥꾼의 띠').replace('Celerity Stone', '쾌속의 돌').replace('Guardians Ring', '수호자의 반지').replace('Heart Of The Wolf', '늑대의 심장').replace('PocketWatch', '회중시계').replace('MudTooth', '머드투스').replace('WailingWood', '울부짖는 나무').replace('StuckMerchant', '꼼짝않는 상인').replace('TheLostGantry', '잃어버린 지지대').replace('TraitBook', '지식의 고서').replace('DrifterMask', '방랑자의 가면').replace('TheHarrow', '쟁쇠장이').replace('StormCaller', '폭풍을 부르는 자').replace('TwistedIdol', '뒤틀린 우상').replace('GalenicCharm', '갈레닉 부적').replace('BrutalMark', '야만의 표식').replace('CleansingJewel', '정화의 보석').replace('MendersCharm', '치유사의 부적').replace('RockOfAnguish', '격통의 바위').replace('ButchersFetish', '도살자의 페티쉬').replace('StormAmulet', '폭풍의 목걸이').replace('VengeanceIdol', '복수의 우상').replace('SoulAnchor', '영혼의 닻').replace('ScavengersBauble', '고철 수집가의 싸구려 보석').replace('HeartSeeker', '심장 추적기').replace('MothersRing', '어머니의 반지').replace('PillarOfStone', '돌 기둥').replace('RingOfEvasion', '회피의 반지').replace('Sagestone', '현자의 돌').replace('BraidedThorns', '꼬은 가시').replace('RootCirclet', '뿌리의 관').replace('LeechEmber', '거머리 잉걸불').replace('HuntersHalo', '사냥꾼의 광륜').replace('GravityStone', '중력의 돌').replace('EzlansBand', '에즐란의 띠').replace('BandOfStrength', '힘의 띠').replace('JewelOfTheBlackSun', '검은 태양의 보석').replace('BloodFont', '피의 서약').replace('DevouringLoop', '삼켜지는 고리').replace('RazorStone', '날카로운 돌').replace('StoneOfBalance', '균형의 돌').replace('KeepersRing', '문지기의 반지').replace('HuntersBand', '사냥꾼의 띠').replace('CelerityStone', '쾌속의 돌').replace('GuardiansRing', '수호자의 반지').replace('HeartOfTheWolf', '늑대의 심장').replace('HuntersHideout', '사냥꾼의 은신처').replace('TotemFather', '토템 아범').replace('Ruins', '유적').replace('Flautist', '판 연주자').replace('StuckMerchant', '꼼짝않는 상인').replace('TheElfQueen', '엘프 여왕의 처소').replace('OldManAndConstruct', '황무지 상인').replace('Monolith', '모놀리스').replace('ArmorVault', '아카리 금고').replace('Settlement', '안식처').replace('AcesCoin', '이상한 동전').replace('ReggiesRing', '빛 바랜 반지')
            
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
