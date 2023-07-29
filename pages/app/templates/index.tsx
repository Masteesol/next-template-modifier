import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import { NextPage } from 'next';
import PageLayout from "@/components/app/PageLayout";
import {
  DividerPipe,
  FlexColCentered,
  FlexColContainer,
  FlexRowCenteredY,
  FlexRowContainer,
  InputBase,
  PlusButton,
  FlexRowCenteredX,
  DividerHorizontal,
} from "@/components/shared/styled-global-components";

import { GetServerSideProps } from 'next';
//import { translateOrDefault } from "@/utils/i18nUtils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
//import { useTranslation } from "next-i18next";
import { debounce } from 'lodash';
import TemplateSingleTemplateCard from "@/components/app/TemplateEditor/EditorCard/SingleCard";
import TemplateCollectionsCard from "@/components/app/TemplateEditor/EditorCard/CollectionsCard"
import CategoryManagerColumn from "@/components/app/TemplateEditor/ManagerInterface/CategoryManagerColumn";
import TemplateManagerColumn from "@/components/app/TemplateEditor/ManagerInterface/TemplateManagerColumn"
import GuidingDescriptionText from "@/components/app/TemplateEditor/GuidingDescription";
import cookie from 'cookie'
import { AuthContext } from "@/context/AuthContext";
import Cookies from "js-cookie";
import {
  createCategory,
  createTemplate,
  deleteCollectionTemplate,
  deletedCategory,
  deletedTemplate,
  updateCategory,
  updateTemplate,
} from "@/requests/templates";
import { SaveStatusContext } from "@/context/SavedStatusContext";

import { saveMessage, updateTemplatesState } from "@/utils/helpers";
import { Templates, TemplatesContainer } from "@/types/global"
import { useRouter } from "next/router"
import { BsPlusLg, BsStarFill } from "react-icons/bs";
import MinimizedManager from "@/components/app/TemplateEditor/ManagerInterface/MinimizedManager";
import { TemplatesContext } from "@/context/TemplatesContext";

type PageProps = {
  authenticated: boolean,
  userID: string | null,
}

const delayedUpdateCategory = debounce((category_id, userID, newCatTitle, setSaveStatus) => {
  const update = async () => {
    const response = await updateCategory(newCatTitle, category_id, userID)
    if (response) {
      console.log("updated category")
      setSaveStatus("Auto-saved Changes")
      setTimeout(() => { setSaveStatus("") }, 2000)
    } else {
      setSaveStatus("Erro saving changes")
      setTimeout(() => { setSaveStatus("") }, 2000)
    }
  }
  update()
}, 2000);


const checkLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return null;
}


const tierLimits = {
  char: 1000,
}

interface tierLimit {
  char: number;
}

const Page: NextPage<PageProps> = () => {
  //const { t } = useTranslation("common");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { textTemplates, setTextTemplates } = useContext(TemplatesContext);
  const [templateRefs, setTemplateRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
  const [viewCategories, setViewCategories] = useState(true);
  const [viewNavigation, setViewNavigation] = useState(true);
  const { setSaveStatus } = useContext(SaveStatusContext)
  const { isAuthenticated } = useContext(AuthContext)
  const router = useRouter()
  const [subscriptionLimits, setSubscriptionLimits] = useState<tierLimit>()

  const userID = Cookies.get("user_id")
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    console.log(textTemplates)
    const setData = () => {
      if (textTemplates) {
        //needs to come from DB
        setSubscriptionLimits(tierLimits)
        const findFirstFavourited = () => {
          return textTemplates.filter(item => item.favourited && item)
        }
        if (findFirstFavourited()[0]?.order) {
          setSelectedCategory(findFirstFavourited()[0].order)
        }
        const setSelectedCategoryAndTemplateFromUrl = () => {
          const categoryID = router.query.category_id;
          if (categoryID) {
            //console.log(categoryID)
            const index = textTemplates.findIndex((container: TemplatesContainer) => container.category_id === categoryID);
            if (index !== -1) {
              // Found the category in templatesContainers at the index
              setSelectedCategory(index)
              console.log('Category index:', index);
            } else {
              // Category was not found in templatesContainers
              console.log('Category not found');

            }
          }
        }
        setSelectedCategoryAndTemplateFromUrl()
      }
    }
    setData()
  }, [userID, textTemplates]);

  useEffect(() => {
    const getViewCategories = () => {
      const savedValue = checkLocalStorage("viewCategories")
      if (savedValue === true || savedValue === false) {
        setViewCategories(savedValue)
      } else {
        //If the user has never used the the app
        setViewCategories(window.innerWidth > 900);
      }
    }
    const getViewTemplates = () => {
      const savedValue = checkLocalStorage("viewNavigation")
      //console.log(savedValue)
      if (savedValue === true || savedValue === false) {
        setViewNavigation(savedValue)
      } else {
        //If the user has never used the the app
        setViewNavigation(window.innerWidth > 900);
      }
    }
    getViewCategories()
    getViewTemplates()
  }, [])

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleSelectCategory = (index: number) => {
    setSelectedCategory(index);
  }
  const handleViewCategorySelect = () => {
    setViewCategories(prevViewCategories => {
      if (typeof window !== "undefined") {
        localStorage.setItem('viewCategories', JSON.stringify(!prevViewCategories));
      }
      return !prevViewCategories;
    });
  }

  const handleViewNavigationSelect = () => {
    setViewNavigation(prevViewNavigation => {
      if (typeof window !== "undefined") {
        localStorage.setItem('viewNavigation', JSON.stringify(!prevViewNavigation));
      }
      return !prevViewNavigation;
    });
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (textTemplates.length > 0 && selectedCategory < textTemplates.length) {
      const newRefs = textTemplates[selectedCategory].templates.map((_, i) => templateRefs[i] || React.createRef());
      setTemplateRefs(newRefs);
    }
  }, [textTemplates, selectedCategory]);
  /* eslint-disable react-hooks/exhaustive-deps */

  const handleInputCatTitleChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number, category_id: string) => {
    const newCatTitle = e.target.value;
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    delayedUpdateCategory(category_id, userID, newCatTitle, setSaveStatus)
    //updateCategory(category_id, userID, newCatTitle)
    const newTextTemplates = [...textTemplates];
    newTextTemplates[index].category_name = newCatTitle;
    setTextTemplates(newTextTemplates);
  };

  const handleTextTemplateChange = async (categoryIndex: number, templateIndex: number, newTemplate: Templates) => {
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    const { template_id, text, title, char_limit, word_limit, limiter_active } = newTemplate
    await updateTemplate(title, text, userID, template_id, char_limit, word_limit, limiter_active)
    saveMessage(setSaveStatus, "Saved Changes")
    console.log(("Saved Changes"))
    updateTemplatesState(categoryIndex, templateIndex, newTemplate, setTextTemplates)
  };

  const handleCreateCategory = async () => {
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    createCategory(userID, textTemplates, setTextTemplates, setSelectedCategory)
  }


  const handleCreateTemplate = async (is_collection = false) => {
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    createTemplate(userID, textTemplates, setTextTemplates, selectedCategory, is_collection)
  }

  const handleRemoveTemplate = async (index: number, template_id: string, is_collection = false) => {
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    if (is_collection) {
      deleteCollectionTemplate(userID, textTemplates, setTextTemplates, selectedCategory, template_id, index)
    } else {
      deletedTemplate(userID, textTemplates, setTextTemplates, selectedCategory, template_id, index)
    }

  };

  const handleRemoveCategory = async (index: number, category_id: string) => {
    if (!userID) {
      console.error("User ID is null.");
      return;
    }
    deletedCategory(userID, textTemplates, setTextTemplates, setSelectedCategory, selectedCategory, category_id, index)
  };

  return (
    <>
      <Head>
        <title>Template Editor</title>
        <meta name="description" content="The template editor is at the core of the template modifier app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout authenticated={isAuthenticated}>
        <FlexRowContainer className="gap-2 relative h-full">
          {/**Toggle View */}
          <FlexRowCenteredX className="w-full md:w-[fit-content] h-[fit-content] fixed bottom-0 md:top-[3rem] md:right-0 z-50">
            <MinimizedManager
              viewCategories={viewCategories}
              handleCreateCategory={handleCreateCategory}
              handleViewCategorySelect={handleViewCategorySelect}
              handleViewNavigationSelect={handleViewNavigationSelect}
              textTemplates={textTemplates}
              selectedCategory={selectedCategory}
              viewNavigation={viewNavigation}
              handleCreateTemplate={handleCreateTemplate}
            />
          </FlexRowCenteredX>
          {/**Categories List */}
          <FlexRowContainer className="absolute bg-gray-50 dark:bg-gray-800 z-[500] xl:static gap-2 h-full">
            {viewCategories &&
              <div className="h-full flex">
                <CategoryManagerColumn
                  viewCategories={viewCategories}
                  handleViewCategorySelect={handleViewCategorySelect}
                  textTemplates={textTemplates}
                  setTextTemplates={setTextTemplates}
                  addCategory={handleCreateCategory}
                  selectedCategory={selectedCategory}
                  handleSelectCategory={handleSelectCategory}
                  handleRemoveCategory={handleRemoveCategory}
                  handleInputCatTitleChange={handleInputCatTitleChange}
                  userID={userID}
                  setSelectedCategory={setSelectedCategory}
                />

              </div>
            }
            {/**Template Navigation List */}
            {viewCategories && <DividerPipe />}
            {
              textTemplates && textTemplates.length > 0 &&
              textTemplates[selectedCategory]?.templates.length > 0 &&
              viewNavigation &&
              <TemplateManagerColumn
                handleViewNavigationSelect={handleViewNavigationSelect}
                textTemplates={textTemplates}
                setTextTemplates={setTextTemplates}
                selectedCategory={selectedCategory}
                handleCreateTemplate={handleCreateTemplate}
                templateRefs={templateRefs}
                userID={userID}
              />
            }
            {textTemplates.length > 0 &&
              textTemplates[selectedCategory]?.templates.length > 0 &&
              viewNavigation && <DividerPipe />}
          </FlexRowContainer>
          {viewCategories
            &&
            <div
              onClick={handleViewCategorySelect}
              className="lg:hidden overlay-bg cursor-pointer"
              style={{ zIndex: 200 }}
            ></div>
          }
          {viewNavigation
            &&
            <div
              onClick={handleViewNavigationSelect}
              className="lg:hidden overlay-bg cursor-pointer"
              style={{ zIndex: 200 }}
            ></div>
          }

          {/**Templates Cards */}
          <FlexRowContainer className="gap-4 w-full justify-center overflow-y-auto h-full" id="templates-container">
            <FlexColContainer className="w-full max-w-[900px] gap-4 relative h-full p-2">
              {textTemplates.length > 0 && textTemplates[0].category_name !== undefined ?
                <FlexColContainer className="gap-4">
                  <FlexColContainer className="h-full" >
                    {textTemplates[selectedCategory]?.templates.length > 0 &&
                      <FlexColContainer className="gap-4">

                        <FlexColContainer className="gap-2">
                          <h2 className="text-sm lg:text-base">{`${textTemplates[selectedCategory].category_name}`}</h2>
                          <DividerHorizontal className=" border-gray-200" />
                        </FlexColContainer>
                        <FlexColContainer className="gap-4">
                          {/**RENDERING FAVOURITES ON TOP */}
                          {textTemplates[selectedCategory]?.templates.filter(template => template.favourited).length > 0
                            &&
                            <FlexColContainer className="gap-4">
                              <FlexRowCenteredY className="gap-2">
                                <h3 className="font-bold text-base md:text-xl">Favourites</h3>
                                <BsStarFill className="text-base md:text-lg text-green-500" />
                              </FlexRowCenteredY>
                              {
                                textTemplates[selectedCategory]?.templates.map((template, templateIndex) => {
                                  if (template.favourited) {
                                    if (!template.is_collection) {
                                      return <TemplateSingleTemplateCard
                                        key={template.template_id}
                                        categoryIndex={selectedCategory}
                                        index={templateIndex}
                                        template={template}
                                        handleRemoveTemplate={handleRemoveTemplate}
                                        handleTextTemplateChange={handleTextTemplateChange}
                                        ref={templateRefs[templateIndex]}
                                        userID={userID}
                                        subscriptionLimits={subscriptionLimits}
                                      />
                                    } else {
                                      return <TemplateCollectionsCard
                                        key={template.template_id}
                                        categoryIndex={selectedCategory}
                                        index={templateIndex}
                                        template={template}
                                        handleRemoveTemplate={handleRemoveTemplate}

                                        ref={templateRefs[templateIndex]}
                                        userID={userID}
                                        subscriptionLimits={subscriptionLimits} />
                                    }
                                  }
                                })

                              }
                              <DividerHorizontal className=" border-gray-200" />
                            </FlexColContainer>
                          }


                          {/**THE REST OF THE TEMPLATES GOES HERE */}
                          {
                            textTemplates[selectedCategory]?.templates.map((template, templateIndex) => {
                              if (!template.favourited) {
                                if (!template.is_collection) {
                                  return <TemplateSingleTemplateCard
                                    key={template.template_id}
                                    categoryIndex={selectedCategory}
                                    index={templateIndex}
                                    template={template}
                                    handleRemoveTemplate={handleRemoveTemplate}
                                    handleTextTemplateChange={handleTextTemplateChange}
                                    ref={templateRefs[templateIndex]}
                                    userID={userID}
                                    subscriptionLimits={subscriptionLimits}
                                  />
                                } else {
                                  return <TemplateCollectionsCard
                                    key={template.template_id}
                                    categoryIndex={selectedCategory}
                                    index={templateIndex}
                                    template={template}
                                    handleRemoveTemplate={handleRemoveTemplate}

                                    ref={templateRefs[templateIndex]}
                                    userID={userID}
                                    subscriptionLimits={subscriptionLimits} />
                                }
                              }

                            })
                          }
                        </FlexColContainer>

                      </FlexColContainer>
                    }
                    {/**If no templates have been created */}
                    {textTemplates[selectedCategory]?.templates.length === 0 &&
                      <FlexColCentered className="h-full">
                        <FlexColCentered className="max-w-[400px] p-8 w-full gap-8 justify-center border-[1px] rounded border-gray-200">
                          <InputBase type="text"
                            value={textTemplates[selectedCategory]?.category_name}
                            className="text-center text-lg bg-white dark:bg-gray-800 w-full"
                            onChange={(e) => handleInputCatTitleChange(e, selectedCategory, textTemplates[selectedCategory].category_id)} />
                          <FlexRowCenteredY className="gap-4 w-full">
                            <i className="w-full text-right text-gray-500">Add Template</i>
                            <PlusButton onClick={() => handleCreateTemplate}>
                              <BsPlusLg />
                            </PlusButton>
                          </FlexRowCenteredY>
                        </FlexColCentered>
                      </FlexColCentered>
                    }
                  </FlexColContainer>
                </FlexColContainer>
                :
                <FlexColContainer className="w-full max-w-[800px]">
                  <GuidingDescriptionText>Your templates will show up here, but first add a template category.</GuidingDescriptionText>
                </FlexColContainer>
              }
              {textTemplates[selectedCategory] && textTemplates[selectedCategory]?.templates.length > 1 && <div className="min-h-[30rem] w-full"></div>}
            </FlexColContainer>

          </FlexRowContainer>
        </FlexRowContainer>
      </PageLayout >
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req ? cookie.parse(context.req.headers.cookie || '') : undefined
  const userID = cookies && cookies.userID
  return {
    props: {
      userID: userID || null,
      ...(await serverSideTranslations(context.locale as string, ["common"]))
    }
  }
}
export default Page;