import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('https://hotcarz.up.railway.app/')

WebUI.click(findTestObject('Object Repository/Page_Hot Carz Dealership/a_Account'))

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/input_Username_username'), 'tsteger0@de.vu')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_Hot Carz Dealership/input_Password_password'), 'ecCUdUhlbLkZJqX8sdq8Sw==')

WebUI.click(findTestObject('Object Repository/Page_Hot Carz Dealership/button_Sign In'))

WebUI.click(findTestObject('Page_Hot Carz Dealership/button_Get Started (1)'))

WebUI.click(findTestObject('Object Repository/Page_Hot Carz Dealership/a_Add new Vehicle'))

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/input_Vin_VIN_carID'), 'N1235465156313')

WebUI.selectOptionByValue(findTestObject('Object Repository/Page_Hot Carz Dealership/select_Select makeAcuraAudiBMWBuickCadillac_aa9f37'), 
    'Acura', true)

WebUI.selectOptionByValue(findTestObject('Object Repository/Page_Hot Carz Dealership/select_Select modelILXIntegraRLRSXTLTLXTSX'), 
    'Integra', true)

WebUI.selectOptionByValue(findTestObject('Object Repository/Page_Hot Carz Dealership/select_Select Body TypeSedanCoupeHatchbackC_f844f0'), 
    'Sedan', true)

WebUI.selectOptionByValue(findTestObject('Object Repository/Page_Hot Carz Dealership/select_Select year2024202320222021202020192_4ca988'), 
    '2023', true)

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/input_Color_color'), 'Red')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/input_Mileage_mileage'), '99')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/input_Details_details'), 'These are details')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_D'), 'D')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_De'), 'De')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_Des'), 'Des')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_Desc'), 'Desc')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_Descr'), 'Descr')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_Descri'), 'Descri')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_Descrip'), 'Descrip')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_Descript'), 'Descript')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_Descripti'), 'Descripti')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_Descriptio'), 'Descriptio')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/textarea_Description'), 'Description')

WebUI.setText(findTestObject('Object Repository/Page_Hot Carz Dealership/input_Price_price'), '40000')

WebUI.click(findTestObject('Object Repository/Page_Hot Carz Dealership/button_Add Vehicle'))

WebUI.rightClick(findTestObject('Object Repository/Page_Hot Carz Dealership/button_Add Vehicle'))

