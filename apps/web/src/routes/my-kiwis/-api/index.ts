import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const getMyKiwis = async (userId: string) => {
  try {
    const myKiwis = await supabaseManager.kiwi.getMyKiwis(userId);
    if (userManager.isGuest) {
      const guestParticipant = userManager.getGuestParticipant();

      if (guestParticipant) {
        myKiwis.forEach((kiwi) => {
          kiwi.participants.push({
            id: guestParticipant.id,
            userId: guestParticipant.userId,
            name: guestParticipant.name,
            profileImage: guestParticipant.profileImage,
            percentage: guestParticipant.percentage,
            color: guestParticipant.color,
            lastActivityAt: guestParticipant.lastActivityAt,
          });
        });
      }
    }
    return myKiwis;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching kiwis:", error);
    throw error;
  }
};
