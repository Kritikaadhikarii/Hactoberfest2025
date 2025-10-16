# Guess_number_Game.py
import streamlit as st
import random

# ------------------------
# High-Contrast Styling
# ------------------------
st.set_page_config(page_title="Guess the Number Game", layout="centered")
high_contrast_css = """
<style>
[data-testid="stAppViewContainer"] {
  background: linear-gradient(180deg, #000000 0%, #0b3d91 100%);
  color: #FFFFFF;
}
.block-container {
  padding: 2rem 3rem;
  max-width: 750px;
}
h1, h2, h3 {
  color: #FFFFFF;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}
.stButton>button {
  background: linear-gradient(90deg,#ffae00,#ff3b3b);
  color: #000000;
  font-weight: 700;
  border: 2px solid #ffffff;
  padding: 8px 18px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
  border-radius: 8px;
}
.stNumberInput>div>input {
  background: #ffffff;
  color: #000000;
  font-weight: 600;
  border-radius: 6px;
}
.stAlert {
  border-left: 6px solid #00ffb3 !important;
  background: rgba(255,255,255,0.06) !important;
  color: #e6f7ff !important;
}
</style>
"""
st.markdown(high_contrast_css, unsafe_allow_html=True)

# ------------------------
# Game Title
# ------------------------
st.title("🎯 Guess the Number Game")
st.subheader("Try to guess the secret number between 1 and 100!")
st.write("Each wrong attempt adds to your score. Fewer attempts = higher score!")

# ------------------------
# Initialize Game State
# ------------------------
if "secret_number" not in st.session_state:
    st.session_state.secret_number = random.randint(1, 100)
    st.session_state.attempts = 0
    st.session_state.history = []


# Reset game
if st.button("🔁 New Game"):
    st.session_state.secret_number = random.randint(1, 100)
    st.session_state.attempts = 0
    st.session_state.history = []
    st.rerun()


# ------------------------
# Game Logic
# ------------------------
guess = st.number_input("Enter your guess:", min_value=1, max_value=100, step=1, key="user_guess")

if st.button("🎯 Submit Guess"):
    st.session_state.attempts += 1
    secret = st.session_state.secret_number

    if guess < secret:
        st.session_state.history.append((guess, "Too low"))
        st.warning(f"⬆️ {guess} is too low! Try a higher number.")
    elif guess > secret:
        st.session_state.history.append((guess, "Too high"))
        st.error(f"⬇️ {guess} is too high! Try a lower number.")
    else:
        st.session_state.history.append((guess, "Correct"))
        st.success(f"🎉 Congratulations! You guessed the correct number **{secret}** 🎯")
        st.balloons()
        st.markdown(f"### 🏆 Your Score: {st.session_state.attempts} attempts")
        st.info("Try again and beat your previous score!")

# ------------------------
# Show Attempts History
# ------------------------
if st.session_state.history:
    st.markdown("### 📜 Guess History")
    for i, (g, res) in enumerate(st.session_state.history, start=1):
        st.write(f"{i}. {g} → {res}")

# ------------------------
# Developer Info (optional)
# ------------------------
with st.expander("⚙️ Developer Info"):
    #st.write("Secret number (debug):", st.session_state.secret_number)
    st.json({
        "attempts": st.session_state.attempts,
        "history": st.session_state.history
    })
