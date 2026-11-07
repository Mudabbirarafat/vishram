// The journal entries, in one place.
//
// The three cards in the Blog section used to link to href="#" - a heading,
// an excerpt and a "View" that went nowhere, three times over. A card that
// looks clickable and is not is worse than no card, so the posts became real
// pages and this is what both the section and those pages read.

export const posts = [
  {
    slug: 'four-days-in-tirthan-valley',
    title: 'What to do with four days in Tirthan Valley',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'A forested Himalayan valley with a river running through it',
    excerpt:
      'Four days is enough for the river, the pass and one long walk, and not much else. Here is the order we would do them in.',
    body: [
      'Four days sounds like plenty until you are here. The valley is narrow, the roads are slow, and the light goes early behind the ridge. Trying to see everything means spending most of it in a car, so the first piece of advice is to pick three things and let the rest wait for a second visit.',
      'Day one belongs to the river. The Tirthan runs cold and clear below the cabin, and the stretch nearest Gushaini is the easiest to reach on foot. Trout fishing here is licensed and catch-and-release in most seasons; the forest office in Banjar issues permits, and the people who run the homestays downstream will usually tell you where the fish are holding before the office does.',
      'Day two is for the Great Himalayan National Park. The entry point at Ropa is about an hour away, and the day hikes from there climb through oak and deodar into open meadow. You need a permit and, for anything beyond the first few kilometres, a guide; both are arranged at the park office rather than online.',
      'Keep day three for Jalori Pass. At roughly 3,120 metres it is the high point of any trip here, and the walk east along the ridge to Serolsar Lake takes about two hours each way through mossy old forest. Go early. The pass closes in heavy snow between January and March, and in summer the cloud comes up from the Kullu side by mid-afternoon and takes the view with it.',
      'Day four, do nothing. That is not filler advice. The whole reason to come to a valley like this one is the morning where nobody has planned anything, and the cabin has a wood stove and a view for exactly that.',
    ],
  },
  {
    slug: 'eating-around-banjar',
    title: 'Where to eat around Banjar',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'A simple kitchen table set with bowls of food',
    excerpt:
      'There is no restaurant strip here, and that is the point. What there is: siddu, trout, and whoever is cooking that evening.',
    body: [
      'Banjar is a market town of a few streets, and the honest answer about eating here is that you will do most of it where you are staying. The cabin has a kitchen, the vegetable shops in town are good, and there is a flour mill that will sell you the buckwheat you did not know you wanted.',
      'When you do eat out, eat local. Siddu is the dish worth going out of your way for: a steamed wheat bun, usually stuffed with walnut or poppy seed paste, served with ghee or a chutney made from local hemp seed. It is heavy, it is seasonal, and it is better in the small places than anywhere that has put it on a laminated menu.',
      'Trout is the other thing. The valley has had trout farms since the British put the fish in these rivers, and several of the homestays between Gushaini and Sai Ropa will grill one for you with almost nothing on it, which is the correct treatment. Ask in the morning rather than turning up at eight expecting dinner - most kitchens here cook what they bought that day.',
      'A dham, if you are lucky enough to be invited to one, is a different thing altogether: a sit-down meal served on leaf plates at a village function, rice and several preparations of lentil and curd, cooked by a botis whose family have held the job for generations. You cannot book one. You can only be here when one happens.',
      'Two practical notes. Most kitchens stop serving by nine, earlier in winter. And carry cash; the card machine will work right up until the network does not.',
    ],
  },
  {
    slug: 'coming-here-with-children',
    title: 'Coming here with children',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'A child walking along a path beside tall pine trees',
    excerpt:
      'The river is cold and fast, the roads have no pavements, and there is no screen in the cabin. All three are manageable.',
    body: [
      'This is a good place to bring children, with three caveats that are easier to deal with if you know them before you arrive.',
      'The river is the first. It is beautiful, shallow in places, and genuinely dangerous after rain - the level comes up quickly and the stones are slick. The pools near the cabin are fine for paddling in dry weather with somebody standing in the water, and are not a place to let a small child wander off to alone. We would rather say this plainly than have it sound like a formality.',
      'Second, the roads. There are no pavements between the cabin and Banjar, the bends are blind, and buses take more than their share of the width. It is a walk to do single file, holding hands, and not after dark.',
      'Third, there is no television. For the first evening this is a problem. By the second it usually is not. Bring the things that work without a signal - cards, a book each, something to draw with - and let the wood stove do the rest of the entertaining. Mobile data reaches the cabin but comes and goes with the weather.',
      'What works well: the short forest walks from Sai Ropa, which are flat enough for short legs; the trout farm, where somebody will explain the tanks to anyone who asks; and the simple business of a stream, a stick and an afternoon. Jalori Pass is a long drive with a lot of switchbacks, so if your children get carsick, make it the day you leave rather than the day you arrive.',
    ],
  },
]

export function findPost(slug) {
  return posts.find((post) => post.slug === slug) ?? null
}
