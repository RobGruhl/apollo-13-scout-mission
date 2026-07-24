/* Apollo Trail — game content data.
 * Generated from the 34-slide mission content (slides/) by extraction agents;
 * every fact, GET, quote and source traces back to a slide that was itself
 * fact-checked against primary sources (see CLAUDE.md content rules).
 * Regenerate: trail/tools/ (extraction workflow) — do not hand-edit facts here
 * without checking the slide.
 */
const TRAIL_DATA = {
  "decisions": [
    {
      "slide": "4",
      "title": "FREEZE OR SQUEEZE?",
      "get": "GET 57:41",
      "situation": "Two hours after the explosion. Command Module Odyssey is losing power and oxygen — fuel cells dying. Powered-down CM will drop to near freezing (38 F). Lunar Module Aquarius was built for 2 people, 2 days. You need life support for 3 people for almost 4 days.",
      "stakes": "FUEL CELLS DYING. OXYGEN RUNNING OUT.",
      "options": [
        {
          "key": "squeeze",
          "label": "SQUEEZE INTO LM AQUARIUS",
          "blurb": "LM has power, oxygen, life support. Cramped (~160 cu ft, 49 F) but survivable."
        },
        {
          "key": "freeze",
          "label": "STAY IN CM ODYSSEY",
          "blurb": "Roomier (~210 cu ft) but no power, no heat — crew will not survive 4 days."
        }
      ],
      "correctKey": "squeeze",
      "correctOutcome": "At GET 57:41 CAPCOM Jack Lousma radioed: \"We'd like you to start making your way over to the LM now.\" Lovell and Haise brought Aquarius to life; by GET 58:40 Odyssey was fully powered down. The LM — built for 2 for 2 days — kept 3 astronauts alive for nearly 4 days. Cramped, sleepless, condensation on cold walls, but everyone survived.",
      "wrongOutcome": "Houston overrides you. With no power, no heat, and limited oxygen, the crew would not survive 4 days in Odyssey. At GET 57:41 the crew moves to Aquarius: discomfort beats death. Mission continues.",
      "quote": "We were as cold as frogs in a frozen pool, especially Jack Swigert, who got his feet wet and didn't have lunar overshoes.",
      "quoteAttribution": "Jim Lovell, in NASA's Apollo Expeditions to the Moon",
      "sources": [
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        },
        {
          "title": "Apollo 13 in Real Time",
          "url": "https://apolloinrealtime.org/13/"
        },
        {
          "title": "Apollo 13 Mission Report (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf"
        }
      ]
    },
    {
      "slide": "5",
      "title": "SHUT DOWN THE COMMAND MODULE?",
      "get": "GET 58:00",
      "situation": "Odyssey is dying. Explosion destroyed its oxygen and killed the fuel cells. Only three re-entry batteries remain: ~99 amp-hours left of ~120. Re-entry uses roughly 70-80 amp-hours -- and it is about 84 hours away. Odyssey's systems still run, draining batteries. Dead batteries at re-entry = no computer, no guidance, no parachutes.",
      "stakes": "BATTERIES DRAINING. NO WAY TO MAKE MORE.",
      "options": [
        {
          "key": "keeprunning",
          "label": "KEEP CM RUNNING",
          "blurb": "Systems stay warm and ready -- but batteries dead within hours, 84 hours to go."
        },
        {
          "key": "shutdown",
          "label": "SHUT DOWN THE CM",
          "blurb": "Banks ~99 amp-hours for re-entry. Never done before -- but the only chance."
        }
      ],
      "correctKey": "shutdown",
      "correctOutcome": "Houston read up a shutdown procedure that never existed before. Lovell copied alignment angles to paper and transferred them to Aquarius by hand. At GET 58:40 Swigert pulled the final circuit breakers -- Odyssey hung completely dead in space, first time in the Apollo program. Drain fell to essentially zero, banking ~99 amp-hours for re-entry. Odyssey began its cold soak toward 38 F. New fear: will it restart in 3-1/2 days?",
      "wrongOutcome": "Houston overrides you. Keeping Odyssey running would kill the batteries within hours -- re-entry alone needs roughly 70-80 amp-hours. Without power, there is no re-entry. Mission Control powers down Odyssey. All of it. The mission continues.",
      "quote": "Odyssey is completely powered down, according to the procedure that you read to Jack.",
      "quoteAttribution": "Jim Lovell, GET 058:40:12",
      "sources": [
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        },
        {
          "title": "Apollo 13 Mission Report (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf"
        },
        {
          "title": "Air-to-Ground Voice Transcript (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/20160014370/downloads/20160014370.pdf"
        }
      ]
    },
    {
      "slide": "6",
      "title": "Turn Around or Free-Return?",
      "get": "GET 61:29:43",
      "situation": "OXYGEN TANK EXPLODED 6 HOURS AGO. YOU ARE 200,000 MILES FROM EARTH, STILL COASTING TOWARD THE MOON AT A FEW THOUSAND MPH. SERVICE MODULE DAMAGED — MAIN SPS ENGINE MAY BE BROKEN. NO ONE CAN TELL. FUEL CELLS OFFLINE. BACKUP BATTERIES ONLY. YOU MUST PICK A ROUTE HOME NOW.",
      "stakes": "ENGINE STATUS UNKNOWN. ROUTE HOME MUST BE CHOSEN.",
      "options": [
        {
          "key": "turnaround",
          "label": "TURN AROUND",
          "blurb": "Fastest route home — but needs massive burn from possibly broken SPS, jettisons lifeboat."
        },
        {
          "key": "freereturn",
          "label": "FREE-RETURN",
          "blurb": "Loop behind Moon. Safer, less fuel, undamaged LM engine, proven on Apollo 8 and 10."
        }
      ],
      "correctKey": "freereturn",
      "correctOutcome": "At GET 61:29:43 the crew fired the LM descent engine about 34 seconds, putting Apollo 13 on a free-return trajectory looping behind the Moon. It used the undamaged LM engine, kept the LM lifeboat, and conserved fuel for later corrections. The trajectory worked perfectly — Apollo 13 swung around the Moon toward Earth. The conservative choice saved lives.",
      "wrongOutcome": "HOUSTON OVERRIDES. NASA chose FREE-RETURN: a direct abort meant jettisoning the LM lifeboat and betting everything on the SPS engine sitting next to the explosion damage. The LM descent engine fired instead. Mission continues.",
      "quote": "Let's solve the problem, but let's not make it any worse by guessing.",
      "quoteAttribution": "Gene Kranz, Flight Director, to his controllers on the night of the accident",
      "sources": [
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        },
        {
          "title": "Apollo 13 in Real Time",
          "url": "https://apolloinrealtime.org/13/"
        },
        {
          "title": "Apollo 13 Mission Report (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf"
        }
      ]
    },
    {
      "slide": "9",
      "title": "STARS OR SUN/EARTH NAVIGATION?",
      "get": "GET ~73:46",
      "situation": "You must align the navigation platform for course corrections. Normal method: sight known stars through the alignment telescope (AOT). But the explosion made a debris field — \"sparklies\" everywhere. Through the telescope, debris looks identical to stars. Without alignment you cannot aim for Earth. A big burn comes after the Moon flyby. Platform must be checked first.",
      "stakes": "DEBRIS EVERYWHERE. STARS CANNOT BE TRUSTED.",
      "options": [
        {
          "key": "sunearth",
          "label": "SUN/EARTH TERMINATOR CHECK",
          "blurb": "Sun is unmistakable — no debris can fake it. Faster. Good enough accuracy."
        },
        {
          "key": "stars",
          "label": "STAR SIGHTING",
          "blurb": "Most accurate, but debris hides stars — false sightings could misalign platform completely."
        }
      ],
      "correctKey": "sunearth",
      "correctOutcome": "Houston radioed attitude angles. Lovell and Haise maneuvered Aquarius; Lovell watched through the AOT. The Sun appeared where the computer predicted — off less than one Sun-width (about half a degree), inside the 1-degree limit. Mission Control cheered. The same trick returned at MCC-5 (~GET 105:18): Earth's terminator in the COAS gunsight, a hand-timed 14-second burn. Target: a re-entry corridor about 2 degrees wide from ~240,000 miles out.",
      "wrongOutcome": "Houston overrides you. Debris made star sighting impossible — sparklies and stars look identical. NASA checked the platform against the Sun, the one light no debris could imitate. Alignment confirmed. Mission continues.",
      "quote": "Okay. It looks like the Sun check passes.",
      "quoteAttribution": "Jim Lovell, GET 073:47:05",
      "sources": [
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        },
        {
          "title": "Air-to-Ground Voice Transcript (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/20160014370/downloads/20160014370.pdf"
        },
        {
          "title": "Apollo 13 in Real Time",
          "url": "https://apolloinrealtime.org/13/"
        }
      ]
    },
    {
      "slide": "11",
      "title": "SPEED UP OR COAST?",
      "get": "GET 79:27:38",
      "situation": "Free-return path gets you home—slowly, aimed at the Indian Ocean, far from the recovery fleet. Recovery ships wait in the Pacific. Option: a major burn 2 hours after pericynthion (PC+2) to speed up and retarget. Risk: LM Descent Engine must run about 4-1/2 minutes in deep space. Longest burn yet—within design limits but high-stakes.",
      "stakes": "WRONG OCEAN AHEAD. ENGINE COLD. SHIPS WAIT IN PACIFIC.",
      "options": [
        {
          "key": "burn",
          "label": "PERFORM PC+2 BURN",
          "blurb": "Cuts ~10 hours; targets Pacific near USS Iwo Jima; ships waiting; less time to fail."
        },
        {
          "key": "coast",
          "label": "COAST ON FREE-RETURN",
          "blurb": "No burn risk, but ~10 extra hours of cold, CO2—and the wrong ocean."
        }
      ],
      "correctKey": "burn",
      "correctOutcome": "All three astronauts rode it out in Aquarius, the CM dark above them. Lovell throttled up in stages: 10 percent, 40, then full power, Haise watching LM systems. Burn: 4 minutes 24 seconds, ~860 ft/s delta-V. Engine performed flawlessly—never missed a beat. Splashdown moved from Indian Ocean to Pacific near USS Iwo Jima, about 10 hours earlier.",
      "wrongOutcome": "Houston overrides. NASA chose the PC+2 burn: about 10 hours saved, Pacific recovery zone, less time for systems to fail. Haise was coming down with a kidney infection; the cold was unbearable. Hours mattered. Mission continues.",
      "quote": "Jim, you are Go for the burn. Go for the burn.",
      "quoteAttribution": "CAPCOM Vance Brand, Houston",
      "sources": [
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        },
        {
          "title": "Apollo 13 in Real Time",
          "url": "https://apolloinrealtime.org/13/"
        },
        {
          "title": "Apollo 13 Mission Report (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf"
        }
      ]
    },
    {
      "slide": "12",
      "title": "WATER CONSERVATION STRATEGY",
      "get": "GET ~85:00:00",
      "situation": "WATER CRITICALLY LOW. MOST OF IT DIED WITH THE SERVICE MODULE. AQUARIUS'S WATER HAS 3 JOBS: DRINKING, FOOD PREP, AND COOLING THE ELECTRONICS — THE SUBLIMATOR'S DEMAND IS BIGGEST OF ALL. HAISE RAN THE NUMBERS: AT CURRENT RATE, WATER RUNS OUT ABOUT 5 HOURS BEFORE RE-ENTRY. CUT USAGE DRASTICALLY OR THE ELECTRONICS OVERHEAT.",
      "stakes": "WATER OUT 5 HOURS BEFORE RE-ENTRY.",
      "options": [
        {
          "key": "extreme",
          "label": "EXTREME RATIONING",
          "blurb": "Suffer now, survive later — water lasts all the way to splashdown."
        },
        {
          "key": "equal",
          "label": "EQUAL RATIONING",
          "blurb": "Feels fair, but ignores that cooling needs the most water."
        },
        {
          "key": "drinking",
          "label": "PRIORITIZE DRINKING WATER",
          "blurb": "Crew stays sharp, but no water means no cooling — electronics fry."
        }
      ],
      "correctKey": "extreme",
      "correctOutcome": "NASA chose extreme rationing: 6 ounces of water per person per day — one-fifth of normal — stretched with fruit juices and wet-pack foods. Crew lost 31.5 pounds combined; Lovell alone lost 14. Haise developed a kidney infection, fever near 104F. But water lasted home — 28.2 pounds (about 9 percent) left in the tanks — and the electronics never overheated.",
      "wrongOutcome": "HOUSTON OVERRULES. NASA went extreme: 6 ounces per person per day, because the sublimator's cooling demand was biggest of all. The crew suffered — thirst, weakness, Haise's fever — but reached the ocean with water to spare. MISSION CONTINUES.",
      "quote": "It was estimated that the crew would run out of water about five hours before Earth re-entry... They cut down to six ounces each per day, 1/5 of normal intake.",
      "quoteAttribution": "NASA's official Apollo 13 mission history",
      "sources": [
        {
          "title": "NASA: Apollo 13",
          "url": "https://www.nasa.gov/mission/apollo-13/"
        },
        {
          "title": "Apollo 13 Mission Report (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf"
        },
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        }
      ]
    },
    {
      "slide": "13",
      "title": "BUILD THE CO2 MAILBOX?",
      "get": "GET ~93:00:00",
      "situation": "CO2 in the LM climbs toward NASA's safety limit of 15 mmHg. LM's round LiOH canisters were sized for 2 people, 2 days — now 3 people, ~4 days. The CM holds unused SQUARE canisters. Square pegs, round holes. Aboard: plastic bags, cardboard, duct tape, hoses, flight manual covers.",
      "stakes": "CO2 RISING. SQUARE CANISTERS DO NOT FIT.",
      "options": [
        {
          "key": "donothing",
          "label": "DO NOTHING",
          "blurb": "No construction risk — but CO2 keeps climbing; eventually poisoning becomes fatal."
        },
        {
          "key": "buildmailbox",
          "label": "BUILD \"MAILBOX\"",
          "blurb": "Improvised square-to-round adapter; only solution that actually removes CO2. Materials aboard."
        }
      ],
      "correctKey": "buildmailbox",
      "correctOutcome": "Ed Smylie's Crew Systems team designed an adapter from items known to be aboard, tested a copy on the ground. CAPCOM Joe Kerwin read up the steps; Swigert and Lovell built it in about an hour — bags, cardboard, duct tape, a spacesuit hose. CO2 fell from 14.9 mmHg to about 0.2 mmHg within an hour, staying below 2 mmHg the rest of the way home.",
      "wrongOutcome": "HOUSTON OVERRIDES. Doing nothing fixes nothing — three men keep exhaling and rising CO2 clouds judgment, eventually fatal. NASA built the mailbox: ground-tested adapter, read up step by step. CO2 dropped from 14.9 to about 0.2 mmHg. Mission continues.",
      "quote": null,
      "quoteAttribution": null,
      "sources": [
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        },
        {
          "title": "Apollo 13 in Real Time",
          "url": "https://apolloinrealtime.org/13/"
        },
        {
          "title": "Apollo 13 Mission Report (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf"
        }
      ]
    },
    {
      "slide": "16",
      "title": "COMM POWER: LOUD OR LEAN?",
      "get": "GET ~65:00:00",
      "situation": "COMMAND MODULE DEAD. ALL LINKS TO EARTH RUN THROUGH THE LM RADIOS ON BATTERY. LM BATTERIES HOLD ABOUT 2,181 AMP-HOURS. A 45-HOUR SPACECRAFT MUST STRETCH NEARLY 90 HOURS. HOUSTON WANTS HIGH-BIT-RATE TELEMETRY, BUT FULL-POWER COMMS IS ONE OF THE HUNGRIEST SYSTEMS LEFT. A FEW AMPS SAVED, 24 HOURS A DAY FOR 3+ DAYS, ADDS UP TO HUNDREDS OF AMP-HOURS.",
      "stakes": "EVERY AMP COUNTS. BATTERIES ARE ALL YOU HAVE.",
      "options": [
        {
          "key": "regular",
          "label": "FULL-POWER COMMS",
          "blurb": "Rich telemetry and clear voice—but burns amps round the clock from your only batteries."
        },
        {
          "key": "silence",
          "label": "LOW-POWER COMMS",
          "blurb": "Scratchy but voice stays on; saves hundreds of amp-hours for re-entry."
        }
      ],
      "correctKey": "silence",
      "correctOutcome": "HOUSTON SET AQUARIUS FOR MAXIMUM STINGINESS: S-BAND LOW POWER, AMP OFF, OMNI ANTENNAS, LOW-BIT-RATE TELEMETRY, RANGING OFF—VOICE STAYED ON. VOICE CONTACT WAS ESSENTIALLY CONTINUOUS; ONLY GAPS WERE ~25 MINUTES BEHIND THE MOON AND RE-ENTRY BLACKOUT. TOTAL POWERDOWN CUT THE LM TO ROUGHLY 20% OF NORMAL LOAD. AT LM JETTISON, ABOUT 20% OF THE 2,181 AMP-HOURS REMAINED. NASA'S SQUAWK BOXES LET FAMILIES HEAR THE CREW ALIVE.",
      "wrongOutcome": "HOUSTON OVERRIDES: LOW-POWER COMMS. THE LM BATTERIES ARE THE ONLY POWER LEFT. A WEAK-BUT-CONTINUOUS LINK BEATS A STRONG LINK ON DEAD BATTERIES. IN A POWER CRISIS YOU WHISPER—AND NEVER STOP TALKING. MISSION CONTINUES.",
      "quote": null,
      "quoteAttribution": null,
      "sources": [
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        },
        {
          "title": "Apollo 13 in Real Time",
          "url": "https://apolloinrealtime.org/13/"
        },
        {
          "title": "Apollo 13 Mission Report (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf"
        },
        {
          "title": "Air-to-Ground Voice Transcript (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/20160014370/downloads/20160014370.pdf"
        }
      ]
    },
    {
      "slide": "17",
      "title": "RECHARGE FOR RE-ENTRY?",
      "get": "GET ~112:00:00",
      "situation": "Re-entry in 30 hours. The LM lifeboat cannot help with that part. CM battery A lost half its charge (~20 of 40 amp-hours). Entry batteries hold ~99 of ~120 amp-hours; normal re-entry uses 70-80. John Aaron's team proposes pushing power BACKWARDS through the docking umbilical to refill battery A. Never tried. Not in space. Not in a simulator. Not anywhere.",
      "stakes": "BATTERY A HALF EMPTY. NO CUSHION FOR SURPRISES.",
      "options": [
        {
          "key": "jumpstart",
          "label": "CHARGE FROM THE LM",
          "blurb": "Untested, ~15 hours, but full batteries for re-entry; Aaron's team checked the numbers"
        },
        {
          "key": "reserve",
          "label": "FLY WITH REDUCED MARGIN",
          "blurb": "No risky experiment, but only ~20 amp-hours cushion and no second chance"
        }
      ],
      "correctKey": "jumpstart",
      "correctOutcome": "Houston gave the go. At roughly GET 112:12 Jack Swigert started the charge. LM descent batteries fed current backwards through the umbilical into CM battery A — a gentle trickle, about 15 hours, Houston watching voltage and current. At re-entry power-up, Odyssey's batteries held about 118 of 120 amp-hours — nearly liftoff levels. Power to spare.",
      "wrongOutcome": "Houston overrides you. NASA ran John Aaron's reverse charge — the LM had power to spare and the CM had margin it couldn't live without. Swigert started the charge at ~GET 112:12. Mission continues.",
      "quote": "We're 20 amp-hours short on one of the entry batteries.",
      "quoteAttribution": "CAPCOM Jack Lousma to the crew, GET 111:05 (Apollo 13 Flight Journal)",
      "sources": [
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        },
        {
          "title": "Apollo 13 in Real Time",
          "url": "https://apolloinrealtime.org/13/"
        },
        {
          "title": "Apollo 13 Mission Report (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf"
        }
      ]
    },
    {
      "slide": "18",
      "title": "SERVICE MODULE JETTISON TIMING",
      "get": "GET 138:02",
      "situation": "Re-entry is hours away. The dead Service Module must be cut loose first. It shelters the CM heat shield from deep-space cold — effect of a long cold soak unknown. Nobody has seen the blast damage yet; photos would be gold for investigators. One chance at separation. Fail, and a 25-ton module drifts loose beside you.",
      "stakes": "ONE CHANCE AT SEPARATION. 25 TONS BESIDE YOU.",
      "options": [
        {
          "key": "late",
          "label": "LATE JETTISON",
          "blurb": "Shields heat shield longest — but no photos, no time to recover if it fails."
        },
        {
          "key": "early",
          "label": "EARLY JETTISON",
          "blurb": "Time to photograph damage and troubleshoot; clean separation long before entry."
        }
      ],
      "correctKey": "early",
      "correctOutcome": "At GET 138:01:48 — about 4 hours 39 minutes before entry interface — the crew cut the SM loose. Push-pull maneuver: Lovell pushed with LM thrusters, Swigert fired the pyros, Lovell backed away. Separation about 1 foot per second. Clean separation, no collision, clear photographs. Crew saw Bay 4's entire 13-foot panel blown away — one-sixth of the SM's skin.",
      "wrongOutcome": "Houston overrides you. NASA jettisoned early — buying time for damage photos and margin to recover from any separation problem, while still sheltering the heat shield through most of the cold coast home. The photos were the only direct look anyone ever got.",
      "quote": "And there's one whole side of that spacecraft missing.",
      "quoteAttribution": "Jim Lovell, GET 138:04:46",
      "sources": [
        {
          "title": "Apollo 13 Flight Journal",
          "url": "https://www.nasa.gov/history/afj/ap13fj/index.html"
        },
        {
          "title": "Apollo 13 Mission Report (PDF)",
          "url": "https://ntrs.nasa.gov/api/citations/19710003598/downloads/19710003598.pdf"
        },
        {
          "title": "Apollo 13 in Real Time",
          "url": "https://apolloinrealtime.org/13/"
        }
      ]
    }
  ],
  "narratives": [
    {
      "slide": "01-launch",
      "title": "Launch & Mission Overview",
      "get": "GET 00:00:00",
      "text": "APRIL 11, 1970. 2:13 PM EST. You ride the Saturn V off Pad 39A with Lovell, Swigert, and Haise. Destination: Fra Mauro. Ten days planned. GET 00:05:30 — pogo vibrations kill the second stage center engine early. Four engines burn longer. You reach orbit anyway. GET 02:35:46 — Trans-Lunar Injection. You are Moon-bound and off free-return. Everything nominal. For now.",
      "oneLiner": "SATURN V AWAY. ONE ENGINE DOWN. MOON AHEAD."
    },
    {
      "slide": "02-spacecraft",
      "title": "SPACECRAFT CONFIGURATION",
      "get": "",
      "text": "KNOW YOUR SHIP. Three vehicles stacked as one. COMMAND MODULE \"ODYSSEY\": walk-in-closet cabin, only heat shield aboard — only part that comes home. Three 83-ft chutes. Small re-entry batteries; nearly all power, oxygen, water piped from behind. SERVICE MODULE: 3 fuel cells, 2 oxygen tanks at -297 F, 20,500-lb SPS engine. LUNAR MODULE \"AQUARIUS\": lander, 45-hr design life, two crew, no seats. Own power, oxygen, engines. 32-inch tunnel connects. Remember this.",
      "oneLiner": "THREE MODULES. THREE JOBS. ONE SHIP."
    },
    {
      "slide": "03-explosion",
      "title": "The Explosion",
      "get": "GET 55:54:53",
      "text": "April 13, 1970. Day 3. 9:08 PM Houston time. Houston asks Swigert to stir the cryo tanks — routine. He flips the switch. BANG. The ship shakes. Master alarm. \"Houston, we've had a problem.\" Through the window: sparklies, venting gas — oxygen pouring into space. Tank 2: ZERO. Tank 1: falling. Two fuel cells dead. You are 200,000 miles from Earth, coasting toward the Moon. Margin for error: zero.",
      "oneLiner": "O2 TANK 2 EXPLODES. SURVIVAL MISSION BEGINS."
    },
    {
      "slide": "10-lifeboat-moon",
      "title": "Lifeboat & Moon Flyby",
      "get": "GET 57:40",
      "text": "Odyssey is dying. At GET 57:40 you power up Aquarius; by GET 58:40 the lifeboat lives. 160 cubic feet. Three men, thin coveralls, 50°F, wet walls, no sleep. Water: 6 oz per day. Built to keep 2 alive for 45 hours — must keep 3 alive for 84. At GET 77:08 you round the Moon, 158 miles up, 25 minutes of radio blackout. Signal returns. Earth: 66 hours out.",
      "oneLiner": "AQUARIUS ALIVE. MOON PASSED. EARTH 66 HOURS."
    },
    {
      "slide": "14-long-journey",
      "title": "THE LONG COLD JOURNEY HOME",
      "get": "",
      "text": "April 14-16, 1970. The PC+2 burn set your course, but splashdown is 63 hours away. Three men in a two-man lander, nearly everything off. LM: 49-50°F. Dead Command Module: 38°F, walls dripping. You see your breath. Swigert's feet are wet—no overshoes. Water: 6 oz per man per day. The crew loses over 30 pounds between them. Haise's fever climbs to 104°F. Sleep comes in shivering snatches. You are suffering. But you are alive.",
      "oneLiner": "LM 50F. CM 38F. 6 OZ WATER. ENDURE."
    },
    {
      "slide": "15-passive-thermal",
      "title": "PASSIVE THERMAL CONTROL",
      "get": "",
      "text": "Space bakes one hull side at +250 F and freezes the other at -250 F -- a 500-degree swing. Left still, electronics cook, propellants freeze near +12 to +19 F. Your fix: the barbecue roll, one slow spin every 10-20 minutes, nudged by hand with RCS pulses every few hours. Venting gas wobbles the wounded ship; debris hides the stars. LM holds near 50 F, dead Command Module 38 F. Miserable. Survivable.",
      "oneLiner": "BARBECUE ROLL HOLDS. SHIP SPINS. CREW SHIVERS AT 38 F."
    }
  ],
  "arc": {
    "beats": [
      {
        "title": "THE IMPOSSIBLE CHECKLIST",
        "get": "GET ~137:00",
        "text": "No procedure exists to restart a Command Module in flight. Odyssey has been dead 81 hours at 38 degrees F, dripping with condensation. John Aaron's tiger team writes the power-up sequence amp by amp; Ken Mattingly flies it in the simulator until it works. Three months of work in three days. Swigert copies every step by hand."
      },
      {
        "title": "ODYSSEY WAKES",
        "get": "GET 140:10",
        "text": "Service Module already cut loose at GET 138:02 — you photographed the damage. Now, 2.5 hours before entry, Houston calls: \"You're Go to start powering up the Command Module\" (Kerwin, GET 140:09:52). You throw switches over soaked panels, eyes on the current meters. No arc comes. Batteries read 118 of 120 amp-hours. Odyssey is alive."
      },
      {
        "title": "FAREWELL, AQUARIUS",
        "get": "GET 141:30",
        "text": "The lifeboat kept three men alive 84 hours on a ship rated 45 hours for two. It has no heat shield — it cannot come home. Lovell seals the hatch. Trapped tunnel air pops Aquarius free. \"Farewell, Aquarius, and we thank you\" — CAPCOM Joe Kerwin, GET 141:30:05. She tumbles away, foil flashing in the sun."
      },
      {
        "title": "THREADING THE CORRIDOR",
        "get": "GET 142:40:46",
        "text": "The entry corridor is 2.15 degrees wide. Too steep: burn up. Too shallow: skip off into space. Target -6.5 degrees; you cross entry interface at 400,000 feet at about -6.2 — drifted shallow by the LM's venting, still inside the corridor. At nearly 25,000 mph the air ahead becomes 5,000-degree plasma. Radio: static."
      },
      {
        "title": "SIX MINUTES OF SILENCE",
        "get": "GET 142:40:46-142:46:08",
        "text": "Deceleration builds to 5.6 Gs. If the explosion cracked the heat shield, you learn it now. Predicted end of blackout: 142:44:24. Static. A full minute past — longest blackout of any Apollo mission, about 87 seconds over. Kerwin: \"Odyssey, Houston standing by.\" Then Swigert, GET 142:46:08: \"Okay, Joe.\" Alive."
      },
      {
        "title": "TWO GOOD DROGUES, THREE GOOD MAINS",
        "get": "GET 142:48:45",
        "text": "One system left. Chutes cold-soaked four days in the nose — one chance. At 24,000 feet the drogue mortars THUMP. Swigert, GET 142:49:17: \"We got two good drogues.\" At 10,000 feet three mains, 83.5 feet each, blossom. Kerwin: \"We show you on the mains, it really looks great.\" 300 mph slows to 22."
      },
      {
        "title": "SPLASHDOWN",
        "get": "GET 142:54:41",
        "text": "Odyssey hits the South Pacific southeast of American Samoa — one mile from target, USS Iwo Jima four miles off. Mission time: 5 days, 22 hours, 54 minutes, 41 seconds. About 622,000 miles traveled. 45 minutes later you stand on deck: pale, bearded, 31.5 pounds lighter between you. Three left Earth. Three came home."
      }
    ]
  }
};
