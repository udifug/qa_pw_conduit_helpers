import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let homePage;
let createArticlePage;
let viewArticlePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  const user = generateNewUserData();
  const articleTest = generateNewArticleData();
  await signUpUser(page, user);
  await createNewArticle(page, articleTest);
  await viewArticlePage.articleEditClick();
});

test('Edit the article title for the existing article', async () => {
  const article = generateNewArticleData();
  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertArticleHasUpdatedTitle(article.title)
});

test('Edit the article description for the existing article', async () => {
  const article = generateNewArticleData();
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.articleEditClick();
  await createArticlePage.assertArticleHasCorrectDescription(article.description);
});

test('Edit the article text for the existing article', async () => {
  const article = generateNewArticleData();
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertArticleHasUpdatedText(article.text);
});


test('Add the tag for the existing article without tags', async () => {
  const article = generateNewArticleData(1);
  await createArticlePage.fillTagsField(article.tags);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertArticleHasTags(article.tags);
});


test('Add the tag for the existing article with tags', async () => {
  const article = generateNewArticleData(1);
  await createArticlePage.fillTagsField(article.tags);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.articleEditClick();
  const articleNew = generateNewArticleData(2);
  await createArticlePage.fillTagsField(articleNew.tags);
  await createArticlePage.clickUpdateButton();
  await viewArticlePage.assertArticleHasTags(articleNew.tags);
});
