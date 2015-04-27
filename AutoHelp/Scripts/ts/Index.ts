/// <reference path="helpers.ts" />
/// <reference path="base.ts" />
/// <reference path="../typings/handlebars/handlebars.d.ts" />
/// <reference path="../typings/extends.d.ts" />
class IndexPage extends Base.Page {
    private assemblies: Array<any> = new Array();
    private listTemplate: HandlebarsTemplateDelegate;

    public Ready(): void {
        super.Ready();
        this.listTemplate = Handlebars.compile($("#list-template").html());
        var _self = this;
        BaseHelpers.AjaxService('GET', this.options.urlFiles,
            null, (files) => {
                if (files && files.length > 0) {
                    _self.SetAssemblyMenu(files);
                } else {
                    toastr.error("No files", "There is no file to parse : Please upload one or more in Admin page");
                }
            });
    }

    private SetAssemblyMenu(files: Array<any>): void {
        $("#dlist").html(this.listTemplate(files));
        $(".dllChoice").click((event:JQueryEventObject) => {
            var name: string = $(event.currentTarget).attr('id');
            BaseHelpers.RedirectToUrl(this.options.urlDll + '/' + name);
        });
    }
}