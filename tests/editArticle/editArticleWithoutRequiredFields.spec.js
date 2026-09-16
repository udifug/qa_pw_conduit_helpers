import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);

  const user = generateNewUserData();
  article = generateNewArticleData(1);

  await signUpUser(page, user);
  await createNewArticle(page, article);
  await viewArticlePage.articleEditClick();
});

test('Remove an article tag for the existing article with tag', async () => {
  const tagRemove = article.tags[0];
  await createArticlePage.removeTag(tagRemove);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertTagIsNotVisible(tagRemove);
});

test('Remove an article title for the existing article', async () => {
  await createArticlePage.fillTitleField('');
  await createArticlePage.clickUpdateButton();
  await createArticlePage.assertErrorMessageContainsText(
    TITLE_CANNOT_BE_EMPTY
  );
});

test('Remove an article description for the existing article', async () => {
  await createArticlePage.fillDescriptionField('');
  await createArticlePage.clickUpdateButton();
  await createArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY
  );
});


test('Remove the article text for the existing article', async () => {
  await createArticlePage.fillTextField('');
  await createArticlePage.clickUpdateButton();
  await createArticlePage.assertErrorMessageContainsText(
    BODY_CANNOT_BE_EMPTY
  );
});
