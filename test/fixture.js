import { Language, Edition, EditionBase } from '../src/db_models';

async function createLanguage() {
  await Language.add({
    abbreviation: 'en',
    description: '英文'
  });
  await Language.add({
    abbreviation: 'tw',
    description: '繁中'
  });
  await Language.add({
    abbreviation: 'jp',
    description: '日文'
  });
}

async function createEdition() {
  let err, editionBase1, editionBase2, edition;
  [err, editionBase1] = await EditionBase.add({
    abbreviation: 'ed1'
  });
  await Edition.add({
    edition_base_id: editionBase1.edition_base_id,
    language_id: 1,
    name: 'enEdition1',
  });

  await Edition.add({
    edition_base_id: editionBase1.edition_base_id,
    language_id: 2,
    name: 'twEdition1',
  });
  await Edition.add({
    edition_base_id: editionBase1.edition_base_id,
    language_id: 3,
    name: 'jpEdition1',
  });


  [err, editionBase2] = await EditionBase.add({
    abbreviation: 'ed2',
  })
  await Edition.add({
    edition_base_id: editionBase2.edition_base_id,
    language_id: 2,
    name: 'twEdition2',
  });

  [err, edition ] =
  await Edition.add({
    edition_base_id: editionBase2.edition_base_id,
    language_id: 3,
    name: 'jpEdition2',
  });
}

export { createLanguage, createEdition };
