import random
import time
import os

# another map
symbol_emoji = {
    "cherry": "🍒",
    "ghost": "👻",
    "bone": "🦴",
    "7": "7",
    "dog": "🐶"
}

# rewritten stuff :)))
reel1 = ["cherry"] * 3 + ["ghost"] * 3 + ["bone"] * 2 + ["7"] + ["dog"]
reel2 = ["cherry"] * 4 + ["ghost"] * 2 + ["bone"] * 2 + ["7"] + ["dog"]
reel3 = ["cherry"] * 2 + ["ghost"] * 3 + ["bone"] * 3 + ["7"] + ["dog"]

# non-cherry payouts
non_cherry_payouts = {
    "ghost": 20,
    "bone": 30,
    "7": 7,
    "dog": 150
}

# initial player state
wallet = 5
spin_cost = 1
prev_spin = ["", "", ""]

print("welcome to python_ut!")
print("spin cost: 1c | type 'q' to quit\n")

while wallet >= spin_cost:
    user_input = input("press [enter] to spin or [q] to quit: ").strip().lower()
    if user_input == "q":
        break

    wallet -= spin_cost

    print("spinning", end="", flush=True)
    for _ in range(3):
        print(".", end="", flush=True)
        time.sleep(0.3)
    print()

    # random choice between slots and reels
    # basically, if　じゅみくっす фух, наконец-то 
    # мы построили вавилонскую башню
    sa = random.choice(reel1)
    sb = random.choice(reel2)
    sc = random.choice(reel3)
    symbols = [sa, sb, sc]

    # clears previous spin via clear/cls commands
    # i REALLY should change the way it works,
    # it's unreliable and can be annoying.
    os.system('cls' if os.name == 'nt' else 'clear')

    print("welcome to python_ut!")
    print("spin cost: 1c | type 'q' to quit\n")

    print("-->", symbol_emoji[sa], symbol_emoji[sb], symbol_emoji[sc], "<--")

    counts = {s: symbols.count(s) for s in set(symbols)}

    coins = 0
    jackpot = False
    near_bonus = False
    ikari_bonus = False

    # cherry payouts
    cherry_count = counts.get("cherry", 0)
    if cherry_count == 1:
        coins = 2
    elif cherry_count == 2:
        coins = 5
    elif cherry_count == 3:
        coins = 10

    # non-cherry 3-match payouts
    for symbol, payout in non_cherry_payouts.items():
        if counts.get(symbol, 0) == 3:
            coins = payout
            if symbol in ["7", "dog"]:
                jackpot = True

    # near bonus, currently only for 7 and dog because the
    # old near bonus had an extremely big probability of occurring
    # (like 99% of the time)
    rare_near = ["7", "dog"]
    for sym in rare_near:
        if counts.get(sym, 0) == 2 and "cherry" not in counts:
            near_bonus = True
            coins = max(coins, 1)

    # ikari bonus (anger/angry bonus?)
    # occurs immediately after getting dogs only in 2 slots.
    # idfk what toby thought about when making the slot machine so
    # profitable with all the bonuses that is has.
    if prev_spin[0] == prev_spin[1] == "dog" and prev_spin[2] != "dog":
        if sa == sb == "dog" and sc != "dog":
            ikari_bonus = True
            coins += 20

    wallet += coins

    if jackpot:
        print("jackpot!")

    if ikari_bonus:
        print("ikari bonus! +20c")

    if near_bonus:
        print("near bonus! +1c refund")

    if coins > 0:
        print(f"you won {coins}c.")
    else:
        print("no win.")

    print(f"wallet: {wallet}c\n")

    prev_spin = [sa, sb, sc]

if wallet < spin_cost:
    print("game over.")

print(f"final wallet: {wallet}c.")
